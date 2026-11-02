// Chat do Newton (sem IA): o aluno pergunta, o Newton responde com respostas pré-definidas.
import "@material/web/chips/chip-set.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/textfield/filled-text-field.js";
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

const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)");
let ocupado = false;

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
  linha.innerHTML = `<span class="avatar avatar--pequeno" aria-hidden="true"><md-icon>science</md-icon></span>`;
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

  const resposta = (idTema && temaPorId(idTema)) || responder(pergunta);

  // Uma pequena pausa torna a conversa mais natural (sem IA, a resposta é imediata).
  const escrita = indicadorEscrita();
  adicionar(escrita);
  await esperar(reduzirMovimento.matches ? 300 : 700 + Math.min(resposta.resposta.length, 900));
  escrita.remove();

  const { linha, corpo } = mensagemNewton(formatar(resposta.resposta));
  if (resposta.seguintes?.length) {
    corpo.append(criarChips(resposta.seguintes, "Continuar com outro tema"));
  }
  adicionar(linha);

  ocupado = false;
  atualizarEnviar();
}

function atualizarEnviar() {
  enviar.disabled = ocupado || !campo.value.trim();
}

function novaConversa() {
  mensagens.replaceChildren();
  campo.value = "";
  atualizarEnviar();
  conversa.scrollTo({ top: 0 });
  campo.focus();
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

// A barra superior muda para surface-container quando há conteúdo por baixo (regra do M3).
conversa.addEventListener("scroll", () => {
  appBar.classList.toggle("is-scrolled", conversa.scrollTop > 0);
});

document.getElementById("temas-iniciais").replaceWith(criarChips(TEMAS_INICIAIS, "Temas para começar"));
