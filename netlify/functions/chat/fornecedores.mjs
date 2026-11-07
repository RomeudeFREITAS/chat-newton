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

/** Google Gemini, pela API generateContent. A chave vem da variável de ambiente GEMINI_API_KEY. */
async function gemini({ instrucao, mensagens, ambiente, fetch }) {
  const chave = ambiente.GEMINI_API_KEY;
  if (!chave) throw new ErroIA("Falta a variável GEMINI_API_KEY nas definições do Netlify.", 500);

  // O atalho "gemini-flash-latest" aponta sempre para o Flash atual (sebenta, secção 07).
  // Para fixar um modelo, pôr o nome na variável GEMINI_MODEL, sem mexer no código.
  const modelo = ambiente.GEMINI_MODEL || "gemini-flash-latest";
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
  return { texto, modelo };
}

export const FORNECEDORES = { gemini };
