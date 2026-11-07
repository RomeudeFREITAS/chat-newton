// Ligação da página à IA do Newton (Fase 5), através da função do Netlify em /api/chat.
// A página nunca fala diretamente com o fornecedor de IA nem conhece a chave.

const ESPERA_MAXIMA = 25000; // ms; depois disto o Newton mostra a resposta preparada

/**
 * Pede uma resposta à IA. Devolve { resposta } ou { erro }, onde erro é:
 *   "sem-funcao"   não há função neste site (por exemplo no GitHub Pages ou em `npm run dev`)
 *   "limite"       o fornecedor chegou ao limite de pedidos (U17)
 *   "indisponivel" outro problema: rede, tempo de espera, erro do fornecedor (U16)
 */
export async function pedirIA({ mensagens, ano, temaId }) {
  const controlo = new AbortController();
  const temporizador = setTimeout(() => controlo.abort(), ESPERA_MAXIMA);
  try {
    const resposta = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagens, ano, temaId }),
      signal: controlo.signal,
    });
    if (resposta.status === 404 || resposta.status === 405) return { erro: "sem-funcao" };
    const dados = await resposta.json().catch(() => ({}));
    if (resposta.ok && dados.resposta) return { resposta: dados.resposta };
    return { erro: dados.erro === "limite" ? "limite" : "indisponivel" };
  } catch {
    return { erro: "indisponivel" };
  } finally {
    clearTimeout(temporizador);
  }
}
