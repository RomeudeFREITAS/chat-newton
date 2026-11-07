// Netlify Function do Newton (Fase 5): a página envia a conversa para /api/chat e esta função
// junta a instrução de sistema e a chave da IA, que só ela conhece, e devolve a resposta.
// A chave vive nas variáveis de ambiente do Netlify: nunca aparece na página nem no GitHub.
//
// Privacidade (PRD, secção 11): a função não guarda nada e nunca escreve nos registos o que o aluno disse.

import { temaPorId } from "../../../src/respostas.js";
import { ErroIA, FORNECEDORES } from "./fornecedores.mjs";
import { instrucaoDeSistema } from "./instrucoes.mjs";

// Só as últimas mensagens vão para a IA: poupa pedidos e limites do nível gratuito (sebenta, secção 07)
const MAX_MENSAGENS = 10;
const MAX_CARACTERES = 4000;

/** Fica só com mensagens válidas, as mais recentes, a começar numa mensagem do aluno. */
export function prepararMensagens(mensagens) {
  if (!Array.isArray(mensagens)) return [];
  const validas = mensagens
    .filter((m) => m && (m.autor === "aluno" || m.autor === "newton") && typeof m.texto === "string" && m.texto.trim())
    .map((m) => ({ autor: m.autor, texto: m.texto.trim().slice(0, MAX_CARACTERES) }))
    .slice(-MAX_MENSAGENS);
  const inicio = validas.findIndex((m) => m.autor === "aluno");
  return inicio === -1 ? [] : validas.slice(inicio);
}

/** A página só sabe mostrar parágrafos, listas com "• " e **negrito**: converte o resto. */
export function limparFormato(texto) {
  return texto
    .split("\n")
    .map((linha) => linha.replace(/^\s*#{1,6}\s+/, "").replace(/^\s*[*-]\s+/, "• "))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Só a própria página do Newton pode usar a função a partir de um navegador
function origemPermitida(pedido, ambiente) {
  const origem = pedido.headers.get("origin");
  if (!origem) return true;
  const permitidas = [ambiente.URL, ambiente.DEPLOY_PRIME_URL, ambiente.DEPLOY_URL].filter(Boolean);
  return !permitidas.length || permitidas.includes(origem);
}

const json = (dados, estado = 200) => Response.json(dados, { status: estado });

/** Trata um pedido da página. As opções servem para os testes (ambiente e fetch simulados). */
export async function tratarPedido(pedido, { ambiente = process.env, fetch = globalThis.fetch, esperar } = {}) {
  if (pedido.method !== "POST") return json({ erro: "Usa POST." }, 405);
  if (!origemPermitida(pedido, ambiente)) return json({ erro: "Origem não permitida." }, 403);

  let corpo;
  try {
    corpo = await pedido.json();
  } catch {
    return json({ erro: "Pedido inválido." }, 400);
  }

  const mensagens = prepararMensagens(corpo?.mensagens);
  if (!mensagens.length || mensagens.at(-1).autor !== "aluno") return json({ erro: "Falta a pergunta." }, 400);

  const ano = [7, 8, 9].includes(corpo.ano) ? corpo.ano : null;
  const tema = typeof corpo.temaId === "string" ? (temaPorId(corpo.temaId) ?? null) : null;
  const fornecedor = FORNECEDORES[ambiente.IA_FORNECEDOR || "gemini"];
  if (!fornecedor) {
    console.error(`[chat] Fornecedor de IA desconhecido: ${ambiente.IA_FORNECEDOR}`);
    return json({ erro: "indisponivel" }, 500);
  }

  try {
    const { texto, modelo } = await fornecedor({ instrucao: instrucaoDeSistema({ ano, tema }), mensagens, ambiente, fetch, esperar });
    return json({ resposta: limparFormato(texto), modelo, temaId: tema?.id ?? null });
  } catch (erro) {
    const estado = erro instanceof ErroIA ? erro.estado : 502;
    // Nos registos só fica o erro, nunca o que o aluno escreveu
    console.error(`[chat] ${estado}: ${erro.message}`);
    return estado === 429 ? json({ erro: "limite" }, 429) : json({ erro: "indisponivel" }, 502);
  }
}

export default (pedido) => tratarPedido(pedido);

export const config = { path: "/api/chat" };
