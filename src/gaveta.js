// Gaveta do histórico (Fase 3.4): lista das conversas guardadas neste navegador (G12).
// Construída com os tokens do M3; não usa o navigation drawer do Material Web, que é experimental.

import { icone } from "./icones.js";

/** Junta as conversas por data: Hoje, Ontem, Últimos 7 dias e Mais antigas (só os grupos com conversas). */
export function agruparPorData(conversas, agora = new Date()) {
  // Início de cada dia na hora local (assim a mudança de hora de verão não estraga as contas)
  const dia = (recuo) => new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - recuo).getTime();
  const grupos = [
    { titulo: "Hoje", desde: dia(0) },
    { titulo: "Ontem", desde: dia(1) },
    { titulo: "Últimos 7 dias", desde: dia(6) },
    { titulo: "Mais antigas", desde: -Infinity },
  ].map((grupo) => ({ ...grupo, conversas: [] }));

  for (const conversa of conversas) {
    const momento = new Date(conversa.atualizadaEm).getTime();
    grupos.find((grupo) => momento >= grupo.desde).conversas.push(conversa);
  }
  return grupos.filter((g) => g.conversas.length).map(({ titulo, conversas: lista }) => ({ titulo, conversas: lista }));
}

/** Desenha a lista de conversas dentro da gaveta. */
export function desenharLista(lista, conversas, idAtual, { aoAbrir, aoApagar }) {
  lista.replaceChildren();

  if (!conversas.length) {
    const vazio = document.createElement("p");
    vazio.className = "gaveta__vazio md-typescale-body-medium";
    vazio.textContent = "Ainda não tens conversas. As tuas dúvidas vão aparecer aqui.";
    lista.append(vazio);
    return;
  }

  agruparPorData(conversas).forEach((grupo, i) => {
    const secao = document.createElement("section");
    secao.className = "gaveta__grupo";
    secao.setAttribute("aria-labelledby", `gaveta-grupo-${i}`);

    const titulo = document.createElement("h3");
    titulo.id = `gaveta-grupo-${i}`;
    titulo.className = "gaveta__grupo-titulo md-typescale-title-small";
    titulo.textContent = grupo.titulo;

    const itens = document.createElement("ul");
    for (const conversa of grupo.conversas) {
      const entrada = document.createElement("li");
      entrada.className = "gaveta__entrada";
      entrada.dataset.id = conversa.id;

      const abrir = document.createElement("button");
      abrir.type = "button";
      abrir.className = "gaveta__item md-typescale-label-large";
      abrir.textContent = conversa.titulo;
      abrir.title = conversa.titulo;
      if (conversa.id === idAtual) abrir.setAttribute("aria-current", "page");
      abrir.addEventListener("click", () => aoAbrir(conversa.id));

      const apagar = document.createElement("md-icon-button");
      apagar.className = "gaveta__apagar";
      apagar.setAttribute("aria-label", `Apagar a conversa «${conversa.titulo}»`);
      apagar.title = "Apagar conversa";
      apagar.innerHTML = `<md-icon>${icone("delete")}</md-icon>`;
      apagar.addEventListener("click", () => aoApagar(conversa.id));

      entrada.append(abrir, apagar);
      itens.append(entrada);
    }

    secao.append(titulo, itens);
    lista.append(secao);
  });
}
