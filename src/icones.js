// Ícones do Newton em SVG, servidos pelo próprio site (Guidelines P17: nada de recursos de servidores externos).
// Desenhos oficiais Material Symbols, variante Rounded, peso 400 (Google, licença Apache 2.0),
// copiados do pacote @material-symbols/svg-400. Para juntar um ícone novo, copiar o atributo `d` do SVG.

const caminhos = {
  science:
    "M172-120q-41.78 0-59.39-39T124-230l248-280v-270h-52q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h320q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-52v270l248 280q29 32 11.39 71T788-120H172Zm-12-60h640L528-488v-292h-96v292L160-180Zm318-300Z",
  send: "M814-452 162-178q-15 6-28.5-2.5T120-205v-550q0-16 13.5-24.5T162-782l652 274q18 8 18 28t-18 28ZM180-253l544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z",
  edit_square:
    "M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h333q15 0 22.5 9.32t7.5 20.5q0 11.18-7.68 20.68-7.69 9.5-22.32 9.5H180v600h600v-336q0-15 9.32-22.5t20.5-7.5q11.18 0 20.68 7.5T840-516v336q0 24-18 42t-42 18H180Zm300-360Zm-120 90v-115q0-12.44 5-23.72T378-548l364-364q9-9 20-13t22-4q11 0 22.32 4.5Q817.63-920 827-911l83 84q8.61 8.96 13.3 19.78 4.7 10.83 4.7 22.02 0 11.2-4.5 22.7T910-742L548-378q-8 8-19.28 13-11.28 5-23.72 5H390q-12.75 0-21.37-8.63Q360-377.25 360-390Zm508-395-84-84 84 84ZM420-420h85l253-253-43-42-43-42-252 251v86Zm295-295-43-42 43 42 43 42-43-42Z",
  more_vert:
    "M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z",
};

/** Devolve o SVG de um ícone, pronto a pôr dentro de um <md-icon>. */
export function icone(nome) {
  const d = caminhos[nome];
  if (!d) throw new Error(`Ícone desconhecido: ${nome}`);
  return `<svg viewBox="0 -960 960 960" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
}

/** Preenche todos os <md-icon data-icone="nome"> da página. */
export function preencherIcones(raiz = document) {
  for (const elemento of raiz.querySelectorAll("md-icon[data-icone]")) {
    elemento.innerHTML = icone(elemento.dataset.icone);
  }
}
