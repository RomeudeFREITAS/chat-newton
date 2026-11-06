// Motor de respostas do Newton (sem IA).
// Escolhe a resposta a uma pergunta: primeiro as situações sensíveis, depois os temas, depois a conversa.
// Os conteúdos vivem em src/conteudos/ e são a futura base de conhecimento da IA.

import { TEMAS_7 } from "./conteudos/ano7.js";
import { TEMAS_8 } from "./conteudos/ano8.js";
import { TEMAS_9 } from "./conteudos/ano9.js";
import { CONVERSA, DESCONHECIDA, SITUACOES } from "./conteudos/situacoes.js";

export const TEMAS = [...TEMAS_7, ...TEMAS_8, ...TEMAS_9];

// Temas mostrados no ecrã de boas-vindas e quando o Newton não percebe a pergunta.
export const TEMAS_INICIAIS = ["sistema-solar", "misturas", "transformacoes", "densidade", "acidos", "som"];

export const temaPorId = (id) => TEMAS.find((t) => t.id === id);

const normalizar = (texto) =>
  ` ${texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;

const pontuacao = (texto, palavras) => palavras.filter((p) => texto.includes(p)).length;

/** Os temas que encaixam na pergunta, do mais provável para o menos provável. */
function temasProvaveis(texto) {
  return TEMAS.map((tema) => ({ tema, pontos: pontuacao(texto, tema.palavras) }))
    .filter((r) => r.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos);
}

/**
 * Escolhe a resposta para a pergunta do aluno. Devolve um de três tipos:
 *   { tipo: "tema", tema }                      explicação de um tema
 *   { tipo: "ambigua", temas, texto }           a pergunta encaixa em dois temas: o Newton pergunta qual (G10)
 *   { tipo: "mensagem", texto, seguintes }      situação sensível, conversa ou pergunta desconhecida
 */
export function responder(pergunta) {
  const texto = normalizar(pergunta);
  const original = pergunta.toLowerCase();
  const provaveis = temasProvaveis(texto);

  // 1. Situações sensíveis (Guidelines S1 a S12), por ordem de prioridade
  const situacao = SITUACOES.find(
    (s) => pontuacao(texto, s.palavras) > 0 || s.padroes?.some((padrao) => padrao.test(original)),
  );
  if (situacao) {
    let seguintes = situacao.seguintes;
    if (seguintes === "temas") seguintes = TEMAS_INICIAIS;
    if (seguintes === "tema") seguintes = provaveis.length ? [provaveis[0].tema.id] : TEMAS_INICIAIS;
    return { tipo: "mensagem", texto: situacao.texto, seguintes, situacao: situacao.codigo };
  }

  // 2. Temas: se os dois mais prováveis empatam, o Newton pergunta em vez de adivinhar (G10, S7)
  if (provaveis.length) {
    const [primeiro, segundo] = provaveis;
    if (segundo && segundo.pontos === primeiro.pontos) {
      return {
        tipo: "ambigua",
        temas: [primeiro.tema, segundo.tema],
        texto: `Não apanhei bem. Estás a perguntar sobre **${primeiro.tema.titulo}** ou sobre **${segundo.tema.titulo}**?`,
      };
    }
    return { tipo: "tema", tema: primeiro.tema };
  }

  // 3. Conversa simples (olá, obrigado, quem és)
  const conversa = CONVERSA.find((c) => pontuacao(texto, c.palavras) > 0);
  if (conversa) return { tipo: "mensagem", texto: conversa.texto, seguintes: [] };

  // 4. Não percebeu: admite e mostra os temas (G10)
  return { tipo: "mensagem", texto: DESCONHECIDA, seguintes: TEMAS_INICIAIS };
}
