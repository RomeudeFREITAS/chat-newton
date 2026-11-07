// Camada entre o Newton e o fornecedor de IA (PRD 7.2, decisão 28).
// Cada fornecedor recebe a instrução de sistema e as mensagens no formato do Newton
// ({ autor: "aluno" | "newton", texto }) e devolve só o texto da resposta.
// Para trocar de IA (por exemplo para o Claude, num lançamento real): juntar aqui um fornecedor
// e mudar a variável IA_FORNECEDOR nas definições do Netlify. A página não muda.

export class ErroIA extends Error {
  constructor(mensagem, estado) {
    super(mensagem);
    this.estado = estado;
  }
}

// Modelos de reserva, mais leves, para quando o principal está sobrecarregado (erro 503).
// Os nomes mudam com o tempo: a lista pode mudar-se na variável GEMINI_MODELOS_RESERVA (separados por vírgulas).
const RESERVA_GEMINI = "gemini-3.5-flash-lite";
const TEMPO_MAXIMO = 7000; // ms; a função do Netlify gratuito tem cerca de 10 s no total
const esperarMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Um pedido a um modelo Gemini. Devolve o texto ou lança ErroIA com o código de estado. */
async function pedirGemini({ modelo, chave, instrucao, mensagens, fetch }) {
  const resposta = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelo)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instrucao }] },
        contents: mensagens.map((m) => ({
          role: m.autor === "aluno" ? "user" : "model",
          parts: [{ text: m.texto }],
        })),
      }),
    },
  );

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new ErroIA(dados.error?.message ?? `O Gemini respondeu com o erro ${resposta.status}.`, resposta.status);

  const candidato = dados.candidates?.[0];
  const texto = (candidato?.content?.parts ?? [])
    .filter((parte) => !parte.thought)
    .map((parte) => parte.text ?? "")
    .join("")
    .trim();
  if (!texto) {
    const motivo = candidato?.finishReason ?? dados.promptFeedback?.blockReason ?? "sem motivo";
    throw new ErroIA(`O Gemini não devolveu texto (${motivo}).`, 502);
  }
  return texto;
}

/**
 * Google Gemini, pela API generateContent. A chave vem da variável de ambiente GEMINI_API_KEY.
 * Se o modelo estiver sobrecarregado (500/503), tenta outra vez; se continuar, passa ao modelo de reserva.
 * Se um modelo chegar ao limite (429) ou já não existir (404), passa também ao seguinte.
 */
async function gemini({ instrucao, mensagens, ambiente, fetch, esperar = esperarMs }) {
  const chave = ambiente.GEMINI_API_KEY;
  if (!chave) throw new ErroIA("Falta a variável GEMINI_API_KEY nas definições do Netlify.", 500);

  // O atalho "gemini-flash-latest" aponta sempre para o Flash atual (sebenta, secção 07).
  // Para fixar um modelo, pôr o nome na variável GEMINI_MODEL, sem mexer no código.
  const principal = ambiente.GEMINI_MODEL || "gemini-flash-latest";
  const reservas = (ambiente.GEMINI_MODELOS_RESERVA ?? RESERVA_GEMINI)
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m && m !== principal);

  const inicio = Date.now();
  let ultimoErro;
  for (const modelo of [principal, ...reservas]) {
    for (let tentativa = 1; tentativa <= 2; tentativa++) {
      try {
        const texto = await pedirGemini({ modelo, chave, instrucao, mensagens, fetch });
        return { texto, modelo };
      } catch (erro) {
        ultimoErro = erro;
        const estado = erro.estado;
        // Chave errada, pedido inválido ou sem permissão: não adianta insistir
        if (![404, 429, 500, 502, 503].includes(estado)) throw erro;
        if (Date.now() - inicio > TEMPO_MAXIMO) throw erro;
        // Sobrecarga: uma segunda tentativa no mesmo modelo, depois de uma pausa curta
        if ((estado === 500 || estado === 503) && tentativa === 1) {
          await esperar(800);
          continue;
        }
        console.warn(`[chat] ${modelo} respondeu ${estado}; a passar ao modelo seguinte`);
        break; // passa ao modelo seguinte
      }
    }
  }
  throw ultimoErro;
}

export const FORNECEDORES = { gemini };
