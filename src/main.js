// Chat do Newton (sem IA): o aluno pergunta, o Newton responde com respostas pré-definidas.
import "@material/web/button/filled-tonal-button.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/textfield/filled-text-field.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import { mostrarAviso } from "./aviso.js";
import { abrirHistorico, pedirArmazenamentoPersistente } from "./dados/historico.js";
import { desenharLista } from "./gaveta.js";
import { icone, preencherIcones } from "./icones.js";
import { responder, temaPorId, TEMAS_INICIAIS } from "./respostas.js";
import "./styles/tema-cores.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chat.css";

const conversa = document.getElementById("conversa");
const mensagens = document.getElementById("mensagens");
const formulario = document.getElementById("formulario");
const campo = document.getElementById("campo");
const enviar = document.getElementById("enviar");
const appBar = document.getElementById("app-bar");
const compositor = document.querySelector(".compositor");
const gaveta = document.getElementById("gaveta");
const gavetaLista = document.getElementById("gaveta-lista");
const gavetaScrim = document.getElementById("gaveta-scrim");
const abrirGaveta = document.getElementById("abrir-gaveta");

const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)");
let ocupado = false;

// ---------- Histórico (guardado no navegador: Fase 3) ----------

let historico = null;
let conversaAtual = null;
// Muda sempre que o ecrã passa a mostrar outra conversa: uma resposta que ainda estava "a ser
// escrita" é guardada na conversa certa, mas não aparece na conversa que o aluno abriu entretanto.
let vista = 0;

// Que conversa está aberta neste separador. Recarregar a página mantém-na; fechar o site e voltar
// começa uma conversa nova (a anterior fica na gaveta), como no ChatGPT ou no Gemini.
const CHAVE_CONVERSA_ABERTA = "newton:conversa-aberta";
function lembrarConversaAberta(id) {
  try {
    if (id) sessionStorage.setItem(CHAVE_CONVERSA_ABERTA, id);
    else sessionStorage.removeItem(CHAVE_CONVERSA_ABERTA);
  } catch {
    // sem sessionStorage, recarregar a página começa uma conversa nova
  }
}
function conversaAbertaGuardada() {
  try {
    return sessionStorage.getItem(CHAVE_CONVERSA_ABERTA);
  } catch {
    return null;
  }
}

/** Guardar nunca pode estragar a conversa: se falhar, o aluno continua a conversar. */
async function guardar(operacao) {
  if (!historico) return null;
  try {
    return await operacao(historico);
  } catch (erro) {
    console.warn("Não foi possível guardar no histórico:", erro);
    return null;
  }
}

const tituloDe = (texto) => (texto.length > 60 ? `${texto.slice(0, 59).trimEnd()}…` : texto);

// ---------- Construção das mensagens ----------

/** Converte o texto das respostas (parágrafos, listas "• " e **negrito**) em elementos. */
function formatar(texto) {
  const fragmento = document.createDocumentFragment();

  const comNegrito = (elemento, linha) => {
    linha.split(/\*\*(.+?)\*\*/g).forEach((parte, i) => {
      if (!parte) return;
      if (i % 2) {
        const forte = document.createElement("strong");
        forte.textContent = parte;
        elemento.append(forte);
      } else {
        elemento.append(parte);
      }
    });
    return elemento;
  };

  for (const bloco of texto.trim().split(/\n\s*\n/)) {
    const linhas = bloco.split("\n");
    if (linhas.every((l) => l.startsWith("• "))) {
      const lista = document.createElement("ul");
      linhas.forEach((l) => lista.append(comNegrito(document.createElement("li"), l.slice(2))));
      fragmento.append(lista);
    } else {
      fragmento.append(comNegrito(document.createElement("p"), linhas.join(" ")));
    }
  }
  return fragmento;
}

function criarChips(ids, rotulo) {
  const conjunto = document.createElement("md-chip-set");
  conjunto.className = "sugestoes";
  conjunto.setAttribute("aria-label", rotulo);
  for (const id of ids) {
    const tema = temaPorId(id);
    if (!tema) continue;
    const chip = document.createElement("md-suggestion-chip");
    chip.label = tema.titulo;
    chip.addEventListener("click", () => perguntar(tema.titulo, tema.id));
    conjunto.append(chip);
  }
  return conjunto;
}

function mensagemNewton(conteudo) {
  const linha = document.createElement("div");
  linha.className = "mensagem mensagem--newton";
  linha.innerHTML = `<span class="avatar avatar--pequeno" aria-hidden="true"><md-icon>${icone("science")}</md-icon></span>`;
  const corpo = document.createElement("div");
  corpo.className = "mensagem__corpo";
  const balao = document.createElement("div");
  balao.className = "bubble bubble--newton md-typescale-body-large";
  balao.append(conteudo);
  corpo.append(balao);
  linha.append(corpo);
  return { linha, corpo, balao };
}

function mensagemAluno(texto) {
  const linha = document.createElement("div");
  linha.className = "mensagem mensagem--aluno";
  const balao = document.createElement("p");
  balao.className = "bubble bubble--aluno md-typescale-body-large";
  balao.textContent = texto;
  linha.append(balao);
  return linha;
}

/** Balão do Newton com as sugestões de temas por baixo. */
function respostaNewton(texto, seguintes, tipo) {
  const { linha, corpo } = mensagemNewton(formatar(texto));
  if (seguintes?.length) {
    corpo.append(criarChips(seguintes, tipo === "ambigua" ? "Escolhe o tema" : "Continuar com outro tema"));
  }
  return linha;
}

function indicadorEscrita() {
  const conteudo = document.createElement("span");
  conteudo.className = "a-escrever";
  conteudo.innerHTML = `
    <md-circular-progress indeterminate aria-hidden="true"></md-circular-progress>
    <span class="md-typescale-body-medium">O Newton está a escrever…</span>`;
  return mensagemNewton(conteudo).linha;
}

function adicionar(elemento) {
  mensagens.append(elemento);
  conversa.scrollTo({ top: conversa.scrollHeight, behavior: reduzirMovimento.matches ? "auto" : "smooth" });
}

// ---------- Fluxo da conversa ----------

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** O aluno envia uma pergunta; se vier de um chip, já sabemos o tema. */
async function perguntar(texto, idTema) {
  const pergunta = texto.trim().slice(0, 300);
  if (!pergunta || ocupado) return;

  ocupado = true;
  atualizarEnviar();
  adicionar(mensagemAluno(pergunta));
  const minhaVista = vista;

  // Guardar a pergunta (a conversa só é criada na primeira mensagem)
  await historicoPronto;
  const primeiraPergunta = !conversaAtual;
  if (!conversaAtual) {
    conversaAtual = await guardar((h) => h.criarConversa({ titulo: tituloDe(pergunta) }));
    if (conversaAtual) lembrarConversaAberta(conversaAtual.id);
  }
  const idConversa = conversaAtual?.id;
  if (idConversa) {
    await guardar((h) => h.adicionarMensagem(idConversa, { autor: "aluno", texto: pergunta }));
    atualizarGaveta();
  }

  const resposta = idTema && temaPorId(idTema) ? { tipo: "tema", tema: temaPorId(idTema) } : responder(pergunta);

  // O que mostrar: a explicação de um tema, a pergunta "qual dos temas?" (G10) ou uma mensagem.
  let textoResposta = resposta.texto;
  let seguintes = resposta.seguintes ?? [];
  if (resposta.tipo === "tema") {
    textoResposta = resposta.tema.explicacao;
    seguintes = resposta.tema.seguintes;
  } else if (resposta.tipo === "ambigua") {
    seguintes = resposta.temas.map((t) => t.id);
  }

  // Uma pequena pausa torna a conversa mais natural (sem IA, a resposta é imediata).
  const escrita = indicadorEscrita();
  adicionar(escrita);
  await esperar(reduzirMovimento.matches ? 300 : 700 + Math.min(textoResposta.length, 900));
  escrita.remove();

  if (vista === minhaVista) adicionar(respostaNewton(textoResposta, seguintes, resposta.tipo));

  // Guardar a resposta tal como foi mostrada; o título da conversa passa a ser o tema da primeira resposta
  if (idConversa) {
    await guardar((h) =>
      h.adicionarMensagem(idConversa, {
        autor: "newton",
        texto: textoResposta,
        tipo: resposta.tipo,
        temaId: resposta.tipo === "tema" ? resposta.tema.id : null,
        seguintes,
        situacao: resposta.situacao ?? null,
      }),
    );
    if (primeiraPergunta && resposta.tipo === "tema") {
      const renomeada = await guardar((h) => h.renomearConversa(idConversa, resposta.tema.titulo));
      if (renomeada && conversaAtual?.id === idConversa) conversaAtual = renomeada;
    }
    atualizarGaveta();
  }

  ocupado = false;
  atualizarEnviar();
}

function atualizarEnviar() {
  enviar.disabled = ocupado || !campo.value.trim();
}

/** Limpa o ecrã para uma conversa em branco (a anterior fica guardada na gaveta). */
function limparVista() {
  vista++;
  conversaAtual = null;
  lembrarConversaAberta(null);
  mensagens.replaceChildren();
  conversa.scrollTo({ top: 0 });
}

function novaConversa() {
  // A conversa nova só é criada quando o aluno escrever
  limparVista();
  campo.value = "";
  atualizarEnviar();
  atualizarGaveta();
  fecharGaveta({ devolverFoco: false });
  campo.focus();
}

/** Mostra uma conversa guardada (sem animação: já foi lida). */
function mostrarConversa({ conversa: dados, mensagens: lista }) {
  vista++;
  conversaAtual = dados;
  lembrarConversaAberta(dados.id);
  mensagens.replaceChildren();
  for (const m of lista) {
    const elemento = m.autor === "aluno" ? mensagemAluno(m.texto) : respostaNewton(m.texto, m.seguintes, m.tipo);
    elemento.classList.add("sem-animacao");
    mensagens.append(elemento);
  }
  conversa.scrollTo({ top: conversa.scrollHeight });
}

// ---------- Gaveta do histórico ----------

const ecraGrande = matchMedia("(min-width: 1200px)");
let gavetaAberta = false;

/** Em ecrãs pequenos a gaveta é modal: o resto da página fica inativo enquanto está aberta. */
function aplicarEstadoGaveta() {
  const modal = !ecraGrande.matches;
  const aberta = modal && gavetaAberta;
  gaveta.classList.toggle("aberta", aberta);
  gavetaScrim.classList.toggle("visivel", aberta);
  gaveta.inert = modal && !aberta;
  for (const elemento of [appBar, conversa, compositor]) elemento.inert = aberta;
  if (modal) {
    gaveta.setAttribute("role", "dialog");
    gaveta.setAttribute("aria-modal", "true");
  } else {
    gaveta.removeAttribute("role");
    gaveta.removeAttribute("aria-modal");
  }
  abrirGaveta.setAttribute("aria-expanded", String(aberta));
}

function abrirAGaveta() {
  gavetaAberta = true;
  aplicarEstadoGaveta();
  const atual = gavetaLista.querySelector(".gaveta__item[aria-current]");
  (atual ?? document.getElementById("gaveta-nova")).focus();
}

function fecharGaveta({ devolverFoco = true } = {}) {
  if (!gavetaAberta) return;
  gavetaAberta = false;
  aplicarEstadoGaveta();
  if (devolverFoco && !ecraGrande.matches) abrirGaveta.focus();
}

async function atualizarGaveta() {
  const conversas = (await guardar((h) => h.listarConversas())) ?? [];
  desenharLista(gavetaLista, conversas, conversaAtual?.id, { aoAbrir: abrirConversa, aoApagar: apagarConversa });
}

async function abrirConversa(id) {
  if (id !== conversaAtual?.id) {
    const dados = await guardar((h) => h.obterConversa(id));
    if (!dados) return atualizarGaveta();
    mostrarConversa(dados);
    atualizarGaveta();
  }
  fecharGaveta();
}

/** Apaga uma conversa e dá alguns segundos para "Anular" (G9: fácil de corrigir). */
async function apagarConversa(id) {
  // O foco passa para a conversa seguinte (ou anterior), para quem usa o teclado não se perder
  const entradas = [...gavetaLista.querySelectorAll(".gaveta__entrada")];
  const posicao = entradas.findIndex((e) => e.dataset.id === id);
  const vizinha = (entradas[posicao + 1] ?? entradas[posicao - 1])?.dataset.id;

  let copia;
  try {
    copia = await historico.obterConversa(id);
    await historico.apagarConversa(id);
  } catch (erro) {
    console.warn("Não foi possível apagar a conversa:", erro);
    mostrarAviso("Não foi possível apagar a conversa. Tenta outra vez.");
    return;
  }

  const eraAAtual = conversaAtual?.id === id;
  if (eraAAtual) limparVista();
  await atualizarGaveta();
  const destino = vizinha && gavetaLista.querySelector(`.gaveta__entrada[data-id="${CSS.escape(vizinha)}"] .gaveta__apagar`);
  (destino ?? document.getElementById("gaveta-nova")).focus();

  if (!copia) return;
  mostrarAviso("Conversa apagada", {
    acao: "Anular",
    aoAgir: async () => {
      await guardar((h) => h.restaurarConversa(copia));
      // Se era a conversa aberta e o aluno ainda não começou outra, volta a aparecer no ecrã
      if (eraAAtual && !conversaAtual && !mensagens.children.length) mostrarConversa(copia);
      atualizarGaveta();
    },
  });
}

// ---------- Eventos ----------

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value;
  if (!texto.trim() || ocupado) return;
  campo.value = "";
  atualizarEnviar();
  perguntar(texto);
});

// O campo do Material Web não submete o formulário com Enter: tratamos aqui.
campo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter" && !evento.isComposing) {
    evento.preventDefault();
    formulario.requestSubmit();
  }
});

campo.addEventListener("input", atualizarEnviar);
enviar.addEventListener("click", () => formulario.requestSubmit());
document.getElementById("nova-conversa").addEventListener("click", novaConversa);
document.getElementById("gaveta-nova").addEventListener("click", novaConversa);
abrirGaveta.addEventListener("click", abrirAGaveta);
gavetaScrim.addEventListener("click", () => fecharGaveta());
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && gavetaAberta) fecharGaveta();
});
ecraGrande.addEventListener("change", () => {
  gavetaAberta = false;
  aplicarEstadoGaveta();
});
aplicarEstadoGaveta();

// O aviso ("Conversa apagada · Anular") aparece por cima da caixa de escrita, sem a tapar
new ResizeObserver(() => {
  document.documentElement.style.setProperty("--altura-compositor", `${compositor.offsetHeight}px`);
}).observe(compositor);

// A barra superior muda para surface-container quando há conteúdo por baixo (regra do M3).
conversa.addEventListener("scroll", () => {
  appBar.classList.toggle("is-scrolled", conversa.scrollTop > 0);
});

/** Abre o histórico; se a página foi recarregada a meio de uma conversa, retoma-a (G12). */
async function iniciarHistorico() {
  historico = await abrirHistorico();
  pedirArmazenamentoPersistente();
  try {
    localStorage.removeItem(CHAVE_CONVERSA_ABERTA); // chave antiga da Fase 3.3, já não é usada
  } catch {
    // sem localStorage não há nada a limpar
  }

  const aberta = conversaAbertaGuardada();
  try {
    const dados = aberta ? await historico.obterConversa(aberta) : null;
    if (dados?.mensagens.length) mostrarConversa(dados);
    else lembrarConversaAberta(null);
  } catch (erro) {
    console.warn("Não foi possível retomar a conversa:", erro);
  }
  await atualizarGaveta();
}

const historicoPronto = iniciarHistorico();

preencherIcones();
document.getElementById("temas-iniciais").replaceWith(criarChips(TEMAS_INICIAIS, "Temas para começar"));
