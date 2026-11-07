// Chat do Newton: o aluno pergunta e o Newton responde com IA (Fase 5), apoiado nos conteúdos preparados.
// Os chips de temas e as situações sensíveis usam sempre as respostas preparadas; se a IA falhar, também.
import "@material/web/button/filled-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/switch/switch.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/progress/circular-progress.js";
import "@material/web/textfield/filled-text-field.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import { mostrarAviso } from "./aviso.js";
import { abrirHistorico, pedirArmazenamentoPersistente } from "./dados/historico.js";
import { desenharLista } from "./gaveta.js";
import { pedirIA } from "./ia.js";
import { icone, preencherIcones } from "./icones.js";
import { responder, temaPorId, TEMAS_INICIAIS, TEMAS_POR_ANO } from "./respostas.js";
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
const alternarGaveta = document.getElementById("alternar-gaveta");
const interruptorGuardar = document.getElementById("guardar-conversa");
const estadoTemporaria = document.getElementById("estado-temporaria");
const botaoApagarHistorico = document.getElementById("apagar-historico");
const dialogoApagar = document.getElementById("dialogo-apagar");
const onboarding = document.getElementById("onboarding");
const passoOla = document.getElementById("passo-ola");
const passoAno = document.getElementById("passo-ano");
const botaoContinuar = document.getElementById("continuar");

const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)");
let ocupado = false;

// ---------- Perfil: o ano do aluno (Fase 4) ----------

let anoAluno = null;

// Fica true quando o site não tem a função da IA (GitHub Pages, `npm run dev`): o resto da visita
// usa só as respostas preparadas, sem tentar a IA em cada pergunta.
let semIA = false;
const temasIniciais = () => TEMAS_POR_ANO[anoAluno] ?? TEMAS_INICIAIS;

// ---------- Histórico (guardado no navegador: Fase 3) ----------

let historico = null;
let conversaAtual = null;
// Muda sempre que o ecrã passa a mostrar outra conversa: uma resposta que ainda estava "a ser
// escrita" é guardada na conversa certa, mas não aparece na conversa que o aluno abriu entretanto.
let vista = 0;
// O que está no ecrã, mensagem a mensagem (para voltar a guardar uma conversa que o aluno deixou de guardar)
let registoAtual = [];
// true quando o aluno desligou "Guardar esta conversa": nada desta conversa fica no histórico
let conversaTemporaria = false;

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

// Título de uma conversa ainda sem tema: a hora, e nunca o que o aluno escreveu (pode ter o nome, P18).
// Quando aparece o primeiro tema, o título passa a ser esse tema.
const tituloProvisorio = (data = new Date()) =>
  `Conversa das ${data.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`;
const ehTituloProvisorio = (titulo) => /^Conversa das \d{1,2}:\d{2}$/.test(titulo ?? "");

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

// ---------- Ações em cada resposta (Fase 6) ----------

// Respostas que explicam matéria (da IA ou preparadas) têm 👍 / 👎 e "De onde vem isto?"
const TIPOS_COM_ACOES = new Set(["ia", "tema"]);
const MOTIVOS = ["Está errado", "Não percebi", "Muito longo", "Não era isto"];
const PEDIDOS = [
  ["Mais simples", "Explica de forma mais simples.", "simples"],
  ["Dá-me um exemplo", "Dá-me um exemplo do dia a dia.", "exemplo"],
  ["Explica de outra forma", "Explica de outra forma.", "outra"],
];
let contadorOrigem = 0;

/** "De onde vem isto?" (G11): o tema que a app enviou à IA, e que a resposta foi escrita por IA (G2). */
function textoOrigem(registo) {
  const tema = temaPorId(registo.temaId);
  const onde = tema
    ? `do tema «${tema.titulo}» · ${tema.ano}.º ano · ${tema.tema} · Aprendizagens Essenciais de março de 2026`
    : null;
  if (registo.tipo === "ia") {
    return onde
      ? `Resposta escrita por IA a partir ${onde}. Confirma no manual.`
      : "Resposta escrita por IA, sem um tema preparado do Newton. Confirma no manual ou com o teu professor.";
  }
  return onde ? `Explicação preparada ${onde}. Ainda não foi revista por um professor.` : "Explicação preparada pelo Newton.";
}

/** 👍 / 👎 com motivo opcional (G15) e "De onde vem isto?" (G11). O feedback fica só no navegador. */
function criarFeedback(registo) {
  const zona = document.createElement("div");
  zona.className = "feedback";

  const botaoVoto = (voto, rotulo, nomeIcone) => {
    const botao = document.createElement("md-icon-button");
    botao.toggle = true;
    botao.selected = registo.feedback?.voto === voto;
    botao.setAttribute("aria-label", rotulo);
    botao.title = rotulo;
    botao.innerHTML = `<md-icon>${icone(nomeIcone)}</md-icon><md-icon slot="selected">${icone(`${nomeIcone}_fill`)}</md-icon>`;
    return botao;
  };
  const ajudou = botaoVoto("ajudou", "Ajudou", "thumb_up");
  const naoAjudou = botaoVoto("nao-ajudou", "Não ajudou", "thumb_down");

  const idOrigem = `origem-${++contadorOrigem}`;
  const botaoOrigem = document.createElement("button");
  botaoOrigem.type = "button";
  botaoOrigem.className = "origem md-typescale-label-large";
  botaoOrigem.textContent = "De onde vem isto?";
  botaoOrigem.setAttribute("aria-expanded", "false");
  botaoOrigem.setAttribute("aria-controls", idOrigem);
  const origem = document.createElement("p");
  origem.id = idOrigem;
  origem.className = "origem__texto md-typescale-body-small";
  origem.textContent = textoOrigem(registo);
  origem.hidden = true;
  botaoOrigem.addEventListener("click", () => {
    origem.hidden = !origem.hidden;
    botaoOrigem.setAttribute("aria-expanded", String(!origem.hidden));
  });

  // Os motivos aparecem com um título, para não se confundirem com os outros chips
  const motivos = document.createElement("div");
  motivos.className = "grupo-chips";
  motivos.innerHTML = `<p class="grupo-chips__titulo md-typescale-label-medium">O que faltou?</p>`;
  const chipsMotivos = document.createElement("md-chip-set");
  chipsMotivos.setAttribute("aria-label", "O que faltou?");
  motivos.append(chipsMotivos);
  motivos.hidden = true;
  const obrigado = document.createElement("p");
  obrigado.className = "feedback__obrigado md-typescale-body-small";
  obrigado.setAttribute("role", "status");
  obrigado.textContent = "Obrigado! Isto fica só neste navegador e ajuda a melhorar o Newton.";
  obrigado.hidden = true;

  const gravar = (feedback) => {
    registo.feedback = feedback;
    if (registo.id) guardar((h) => h.guardarFeedback(registo.id, feedback));
  };
  for (const motivo of MOTIVOS) {
    const chip = document.createElement("md-suggestion-chip");
    chip.label = motivo;
    chip.addEventListener("click", () => {
      gravar({ voto: "nao-ajudou", motivo });
      motivos.hidden = true;
      obrigado.hidden = false;
    });
    chipsMotivos.append(chip);
  }
  ajudou.addEventListener("change", () => {
    naoAjudou.selected = false;
    motivos.hidden = true;
    obrigado.hidden = !ajudou.selected;
    gravar(ajudou.selected ? { voto: "ajudou", motivo: null } : null);
  });
  naoAjudou.addEventListener("change", () => {
    ajudou.selected = false;
    obrigado.hidden = true;
    motivos.hidden = !naoAjudou.selected;
    gravar(naoAjudou.selected ? { voto: "nao-ajudou", motivo: null } : null);
  });

  const linhaAcoes = document.createElement("div");
  linhaAcoes.className = "acoes-resposta";
  linhaAcoes.append(ajudou, naoAjudou, botaoOrigem);
  zona.append(linhaAcoes, origem, motivos, obrigado);
  return zona;
}

/** "Mais simples", "Dá-me um exemplo", "Explica de outra forma" (G9): corrigir com um toque. */
function criarPedidos() {
  const conjunto = document.createElement("md-chip-set");
  conjunto.className = "acoes-seguintes";
  conjunto.setAttribute("aria-label", "Pedir outra explicação");
  for (const [rotulo, texto, pedido] of PEDIDOS) {
    const chip = document.createElement("md-assist-chip");
    chip.label = rotulo;
    chip.addEventListener("click", () => perguntar(texto, null, { pedido }));
    conjunto.append(chip);
  }
  return conjunto;
}

/**
 * Balão do Newton. As respostas que explicam matéria têm feedback e "De onde vem isto?".
 * Só a última resposta tem os pedidos de outra explicação e os temas seguintes (no máximo 3).
 */
function respostaNewton(registo, { ultima = false } = {}) {
  const { linha, corpo } = mensagemNewton(formatar(registo.texto));
  const comAcoes = TIPOS_COM_ACOES.has(registo.tipo);
  if (comAcoes) corpo.append(criarFeedback(registo));
  if (ultima) {
    if (comAcoes) corpo.append(criarPedidos());
    const seguintes = comAcoes ? (registo.seguintes ?? []).slice(0, 3) : (registo.seguintes ?? []);
    if (seguintes.length && comAcoes) {
      // Depois de uma explicação, os temas seguintes têm um título que os separa dos pedidos
      const grupo = document.createElement("div");
      grupo.className = "grupo-chips sugestoes";
      grupo.innerHTML = `<p class="grupo-chips__titulo md-typescale-label-medium">Outros temas</p>`;
      grupo.append(criarChips(seguintes, "Outros temas"));
      corpo.append(grupo);
    } else if (seguintes.length) {
      corpo.append(criarChips(seguintes, registo.tipo === "ambigua" ? "Escolhe o tema" : "Continuar com outro tema"));
    }
  }
  return linha;
}

/** Tira os chips das respostas anteriores: só a última resposta tem sugestões. */
function limparSugestoesAntigas() {
  for (const elemento of mensagens.querySelectorAll(".sugestoes, .acoes-seguintes")) elemento.remove();
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

/**
 * O aluno envia uma pergunta; se vier de um chip de tema, já sabemos o tema.
 * `pedido` ("simples", "exemplo" ou "outra") vem das ações por baixo de uma resposta (G9).
 */
async function perguntar(texto, idTema, { pedido = null } = {}) {
  const pergunta = texto.trim().slice(0, 300);
  if (!pergunta || ocupado) return;

  ocupado = true;
  atualizarEnviar();
  botaoContinuar.hidden = true;
  adicionar(mensagemAluno(pergunta));
  registoAtual.push({ autor: "aluno", texto: pergunta });
  const minhaVista = vista;

  // Guardar a pergunta (a conversa só é criada na primeira mensagem; nunca, se o aluno pediu para não guardar)
  await historicoPronto;
  if (!conversaAtual && !conversaTemporaria) {
    conversaAtual = await guardar((h) => h.criarConversa({ titulo: tituloProvisorio() }));
    if (conversaAtual) lembrarConversaAberta(conversaAtual.id);
  }
  const idConversa = conversaAtual?.id;
  if (idConversa) {
    await guardar((h) => h.adicionarMensagem(idConversa, { autor: "aluno", texto: pergunta }));
    atualizarGaveta();
  }

  const resposta =
    idTema && temaPorId(idTema) ? { tipo: "tema", tema: temaPorId(idTema) } : responder(pergunta, temasIniciais());

  // A resposta preparada: a explicação de um tema, a pergunta "qual dos temas?" (G10) ou uma mensagem.
  let textoResposta = resposta.texto;
  let seguintes = resposta.seguintes ?? [];
  let tipo = resposta.tipo;
  let temaId = resposta.tipo === "tema" ? resposta.tema.id : null;
  if (resposta.tipo === "tema") {
    textoResposta = resposta.tema.explicacao;
    seguintes = resposta.tema.seguintes;
  } else if (resposta.tipo === "ambigua") {
    seguintes = resposta.temas.map((t) => t.id);
  }

  const escrita = indicadorEscrita();
  adicionar(escrita);
  const inicio = Date.now();

  // O tema que serve de base de conhecimento: o da pergunta ou, numa pergunta de seguimento, o último da conversa
  const temaBase =
    resposta.tipo === "tema"
      ? resposta.tema
      : resposta.tipo === "ambigua"
        ? resposta.temas[0]
        : temaPorId(registoAtual.findLast((m) => m.autor === "newton" && m.temaId)?.temaId);

  // Perguntas escritas vão para a IA. Ficam de fora os chips de temas (já têm a explicação preparada)
  // e as situações sensíveis (S1 a S12): a segurança não depende do modelo (PRD, decisão 29).
  const situacaoSensivel = resposta.tipo === "mensagem" && resposta.situacao;
  if (!idTema && !situacaoSensivel) {
    const ia = semIA
      ? { erro: "sem-funcao" }
      : await pedirIA({
          mensagens: registoAtual.slice(-10).map(({ autor, texto: t }) => ({ autor, texto: t })),
          ano: anoAluno,
          temaId: temaBase?.id ?? null,
        });

    if (ia.resposta) {
      textoResposta = ia.resposta;
      tipo = "ia";
      temaId = temaBase?.id ?? null;
      seguintes = temaBase?.seguintes ?? [];
    } else {
      // A IA falhou: o Newton diz o que se passa (só uma vez, se o site não tiver IA) e mostra o preparado (U16, U17)
      let aviso = null;
      if (ia.erro === "sem-funcao") {
        if (!semIA) aviso = "Não consegui ligar-me à IA agora.";
        semIA = true;
      } else {
        aviso =
          ia.erro === "limite"
            ? "Por agora cheguei ao limite de perguntas à IA. Tenta outra vez daqui a um minuto."
            : "Não consegui ligar-me à IA agora.";
      }

      if (pedido && temaBase) {
        // Pedido de outra explicação: a versão preparada do tema (PRD 7.1, G9 sem IA)
        textoResposta = pedido === "exemplo" ? temaBase.exemplo : temaBase.simples;
        if (aviso) textoResposta = `${aviso} Entretanto, aqui vai uma versão preparada:\n\n${textoResposta}`;
        tipo = "tema";
        temaId = temaBase.id;
        seguintes = temaBase.seguintes;
      } else if (aviso && resposta.tipo !== "ambigua") {
        const continuacao =
          resposta.tipo === "tema" ? "Entretanto, aqui vai a explicação preparada:" : "Entretanto, estes temas têm explicações preparadas:";
        textoResposta = `${aviso} ${continuacao}\n\n${resposta.tipo === "tema" ? textoResposta : ""}`.trim();
        if (resposta.tipo !== "tema") seguintes = temasIniciais();
      }
    }
  }

  // As respostas preparadas chegam logo; uma pequena pausa torna a conversa mais natural.
  const pausa = tipo === "ia" ? 0 : reduzirMovimento.matches ? 300 : 700 + Math.min(textoResposta.length, 900);
  await esperar(Math.max(0, pausa - (Date.now() - inicio)));
  escrita.remove();

  const registoNewton = {
    autor: "newton",
    texto: textoResposta,
    tipo,
    temaId,
    seguintes,
    situacao: resposta.situacao ?? null,
  };
  if (vista === minhaVista) {
    limparSugestoesAntigas();
    adicionar(respostaNewton(registoNewton, { ultima: true }));
    registoAtual.push(registoNewton);
  }

  // Guardar a resposta tal como foi mostrada; o título da conversa passa a ser o tema da primeira resposta
  if (idConversa) {
    const guardada = await guardar((h) => h.adicionarMensagem(idConversa, registoNewton));
    if (guardada) {
      registoNewton.id = guardada.id;
      // O aluno pode ter carregado em 👍 / 👎 antes de a resposta ficar guardada
      if (registoNewton.feedback) await guardar((h) => h.guardarFeedback(guardada.id, registoNewton.feedback));
    }
    // Ao aparecer o primeiro tema, o título provisório passa a ser esse tema
    if (temaId && conversaAtual?.id === idConversa && ehTituloProvisorio(conversaAtual.titulo)) {
      const renomeada = await guardar((h) => h.renomearConversa(idConversa, temaPorId(temaId).titulo));
      if (renomeada && conversaAtual?.id === idConversa) conversaAtual = renomeada;
    }
    atualizarGaveta();
  }

  ocupado = false;
  atualizarEnviar();
}

function atualizarEnviar() {
  enviar.disabled = ocupado || !campo.value.trim();
  // Enquanto o Newton escreve, não se muda o "guardar" (a resposta ainda vai a caminho)
  interruptorGuardar.disabled = ocupado;
}

/** Mostra se a conversa está a ser guardada (interruptor na gaveta e frase junto à caixa de escrita). */
function mostrarEstadoGuardar() {
  interruptorGuardar.selected = !conversaTemporaria;
  estadoTemporaria.hidden = !conversaTemporaria;
}

/** Limpa o ecrã para uma conversa em branco (a anterior fica guardada na gaveta). */
function limparVista() {
  vista++;
  registoAtual = [];
  conversaTemporaria = false;
  mostrarEstadoGuardar();
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
  botaoContinuar.hidden = true;
  conversaAtual = dados;
  conversaTemporaria = false;
  mostrarEstadoGuardar();
  registoAtual = lista.map(({ id, autor, texto, tipo, temaId, seguintes, situacao, feedback }) => ({
    id,
    autor,
    texto,
    tipo,
    temaId,
    seguintes,
    situacao,
    feedback: feedback ?? null,
  }));
  lembrarConversaAberta(dados.id);
  mensagens.replaceChildren();
  const ultimaResposta = registoAtual.findLastIndex((m) => m.autor === "newton");
  registoAtual.forEach((m, i) => {
    const elemento = m.autor === "aluno" ? mensagemAluno(m.texto) : respostaNewton(m, { ultima: i === ultimaResposta });
    elemento.classList.add("sem-animacao");
    mensagens.append(elemento);
  });
  conversa.scrollTo({ top: conversa.scrollHeight });
}

// ---------- Gaveta do histórico ----------

const ecraGrande = matchMedia("(min-width: 1200px)");
let gavetaAberta = false;

// Em ecrãs grandes o aluno pode recolher a gaveta; o navegador lembra a escolha (só uma preferência)
const CHAVE_GAVETA_RECOLHIDA = "newton:gaveta-recolhida";
let gavetaRecolhida = false;
try {
  gavetaRecolhida = localStorage.getItem(CHAVE_GAVETA_RECOLHIDA) === "sim";
} catch {
  // sem localStorage, a gaveta começa aberta
}

function definirRotulo(botao, texto) {
  botao.setAttribute("aria-label", texto);
  botao.title = texto;
}

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

  // O ☰ dentro da gaveta: em ecrãs pequenos fecha-a; em ecrãs grandes recolhe-a ou expande-a
  const recolhida = !modal && gavetaRecolhida;
  document.body.classList.toggle("gaveta-recolhida", recolhida);
  if (modal) {
    definirRotulo(alternarGaveta, "Fechar as tuas conversas");
    alternarGaveta.removeAttribute("aria-expanded");
  } else {
    definirRotulo(alternarGaveta, recolhida ? "Expandir o menu lateral" : "Recolher o menu lateral");
    alternarGaveta.setAttribute("aria-expanded", String(!recolhida));
  }
}

function alternarAGaveta() {
  if (!ecraGrande.matches) return fecharGaveta();
  gavetaRecolhida = !gavetaRecolhida;
  try {
    if (gavetaRecolhida) localStorage.setItem(CHAVE_GAVETA_RECOLHIDA, "sim");
    else localStorage.removeItem(CHAVE_GAVETA_RECOLHIDA);
  } catch {
    // sem localStorage, a escolha vale só até fechar a página
  }
  aplicarEstadoGaveta();
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
  botaoApagarHistorico.disabled = !conversas.length;
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

// ---------- Primeira visita e ano do aluno (Fase 4: G1, G2, G3, G12) ----------

let aMudarAno = false;

/** Ecrã de boas-vindas com os temas do ano do aluno (ou os temas iniciais, se ainda não o disse). */
function desenharBoasVindas(titulo) {
  if (titulo) document.getElementById("boas-vindas-titulo").textContent = titulo;
  document.getElementById("boas-vindas-texto").textContent = anoAluno
    ? `Estou aqui para te ajudar a estudar Físico\u2011Química. Escolhe um tema do ${anoAluno}.º ano ou escreve a tua dúvida.`
    : "Estou aqui para te ajudar a estudar Físico\u2011Química. Escolhe um tema ou escreve a tua dúvida.";
  const chips = criarChips(temasIniciais(), anoAluno ? `Temas do ${anoAluno}.º ano` : "Temas para começar");
  chips.id = "temas-iniciais";
  document.getElementById("temas-iniciais").replaceWith(chips);

  document.getElementById("opcao-ano").hidden = !anoAluno;
  document.getElementById("gaveta-ano").textContent = `O teu ano: ${anoAluno}.º`;
}

/** Mostra um passo da primeira visita. Também serve para mudar de ano (só o segundo passo). */
function mostrarOnboarding(passo, { mudarAno = false } = {}) {
  aMudarAno = mudarAno;
  document.body.classList.add("em-onboarding");
  onboarding.hidden = false;
  passoOla.hidden = passo !== "ola";
  passoAno.hidden = passo !== "ano";
  document.getElementById("contador-ano").hidden = mudarAno;
  document.getElementById("onboarding-voltar").textContent = mudarAno ? "Cancelar" : "Voltar";
  // Enquanto o aluno escolhe, a gaveta e o "Nova conversa" ficam inativos
  gaveta.inert = true;
  document.getElementById("nova-conversa").inert = true;
  conversa.scrollTo({ top: 0 });
  (passo === "ola" ? document.getElementById("onboarding-titulo") : document.getElementById("titulo-ano")).focus();
}

function fecharOnboarding() {
  document.body.classList.remove("em-onboarding");
  onboarding.hidden = true;
  document.getElementById("nova-conversa").inert = false;
  aplicarEstadoGaveta();
}

async function escolherAno(ano) {
  const mudou = aMudarAno;
  anoAluno = ano;
  await guardar((h) => h.atualizarPerfil({ ano }));
  fecharOnboarding();
  desenharBoasVindas(mudou ? null : "Pronto! Por onde começamos?");
  if (mudou) mostrarAviso(`Agora mostro-te os temas do ${ano}.º ano.`);
  if (mensagens.children.length) campo.focus();
  else document.getElementById("boas-vindas-titulo").focus();
}

/** Quem volta vê "Olá de novo!" e um atalho para a última conversa (G12). */
async function mostrarRegresso() {
  desenharBoasVindas("Olá de novo!");
  if (conversaAtual) return;
  const ultima = await guardar((h) => h.ultimaConversa());
  if (!ultima) return;
  botaoContinuar.textContent = `Continuar: ${ultima.titulo}`;
  botaoContinuar.onclick = () => abrirConversa(ultima.id);
  botaoContinuar.hidden = false;
}

// ---------- Controlo dos dados (G16, G17) ----------

/** "Guardar esta conversa": desligar tira-a do histórico (fica no ecrã); ligar volta a guardá-la. */
async function mudarGuardar() {
  await historicoPronto;
  if (!interruptorGuardar.selected) {
    conversaTemporaria = true;
    const id = conversaAtual?.id;
    conversaAtual = null;
    lembrarConversaAberta(null);
    if (id) await guardar((h) => h.apagarConversa(id));
    mostrarAviso("Conversa retirada do histórico.");
  } else {
    conversaTemporaria = false;
    if (registoAtual.length) {
      // O título segue a regra de sempre: o primeiro tema da conversa ou, sem tema, a hora (nunca o que o aluno escreveu)
      const primeiroTema = temaPorId(registoAtual.find((m) => m.autor === "newton" && m.temaId)?.temaId);
      const nova = await guardar(async (h) => {
        const criada = await h.criarConversa({ titulo: primeiroTema?.titulo ?? tituloProvisorio() });
        for (const mensagem of registoAtual) {
          const guardada = await h.adicionarMensagem(criada.id, mensagem);
          mensagem.id = guardada.id;
          if (mensagem.feedback) await h.guardarFeedback(guardada.id, mensagem.feedback);
        }
        return criada;
      });
      if (nova) {
        conversaAtual = nova;
        lembrarConversaAberta(nova.id);
      }
    }
    mostrarAviso("Conversa guardada outra vez.");
  }
  mostrarEstadoGuardar();
  atualizarGaveta();
}

/** "Apagar o meu histórico": pede confirmação, porque não dá para anular. */
async function pedirApagarHistorico() {
  const quantas = ((await guardar((h) => h.listarConversas())) ?? []).length;
  if (!quantas) return;
  document.getElementById("dialogo-apagar-texto").textContent =
    quantas === 1
      ? "Vais apagar a conversa guardada neste navegador. Depois não a consegues recuperar."
      : `Vais apagar as ${quantas} conversas guardadas neste navegador. Depois não as consegues recuperar.`;
  dialogoApagar.returnValue = "";
  dialogoApagar.show();
}

dialogoApagar.addEventListener("close", async () => {
  if (dialogoApagar.returnValue !== "apagar") return;
  try {
    await historico.apagarHistorico();
  } catch (erro) {
    console.warn("Não foi possível apagar o histórico:", erro);
    mostrarAviso("Não foi possível apagar o histórico. Tenta outra vez.");
    return;
  }
  limparVista();
  await atualizarGaveta();
  document.getElementById("gaveta-nova").focus();
  mostrarAviso("O teu histórico foi apagado.");
});

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
document.getElementById("gaveta-nova-icone").addEventListener("click", novaConversa);
alternarGaveta.addEventListener("click", alternarAGaveta);
interruptorGuardar.addEventListener("change", mudarGuardar);
botaoApagarHistorico.addEventListener("click", pedirApagarHistorico);
document.getElementById("onboarding-seguinte").addEventListener("click", () => mostrarOnboarding("ano"));
document.getElementById("onboarding-voltar").addEventListener("click", () => {
  if (aMudarAno) {
    fecharOnboarding();
    document.getElementById("boas-vindas-titulo").focus();
  } else {
    mostrarOnboarding("ola");
  }
});
for (const botao of document.querySelectorAll("[data-ano]")) {
  botao.addEventListener("click", () => escolherAno(Number(botao.dataset.ano)));
}
document.getElementById("mudar-ano").addEventListener("click", () => {
  fecharGaveta({ devolverFoco: false });
  mostrarOnboarding("ano", { mudarAno: true });
});
abrirGaveta.addEventListener("click", abrirAGaveta);
gavetaScrim.addEventListener("click", () => fecharGaveta());
document.addEventListener("keydown", (evento) => {
  // Com o diálogo de confirmação aberto, o Esc fecha só o diálogo (a gaveta fica aberta por baixo)
  if (evento.key === "Escape" && gavetaAberta && !dialogoApagar.open) fecharGaveta();
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
  // Se o navegador não deixa guardar (ex.: alguns modos privados), o aluno tem de saber (G2, G16)
  if (historico.modo === "memoria") {
    document.getElementById("gaveta-nota").textContent =
      "Este navegador não deixa guardar conversas: desaparecem quando fechares a página.";
    document.getElementById("opcao-guardar").hidden = true;
  }
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

  // Primeira visita: o aluno ainda não disse o ano (Fase 4)
  try {
    anoAluno = (await historico.obterPerfil()).ano ?? null;
  } catch (erro) {
    console.warn("Não foi possível ler o perfil:", erro);
  }
  // A página aparece antes de pôr o foco: um elemento escondido não recebe foco
  document.body.classList.remove("a-carregar");
  if (anoAluno) await mostrarRegresso();
  else {
    desenharBoasVindas();
    mostrarOnboarding("ola");
  }
}

// O ecrã de boas-vindas só aparece com a conversa vazia (G3, U15)
new MutationObserver(() => {
  document.body.classList.toggle("conversa-ativa", mensagens.childElementCount > 0);
}).observe(mensagens, { childList: true });

preencherIcones();
desenharBoasVindas();
// Aconteça o que acontecer ao histórico, a página tem de aparecer e o chat tem de funcionar
const historicoPronto = iniciarHistorico()
  .catch((erro) => console.warn("Não foi possível iniciar o histórico:", erro))
  .finally(() => document.body.classList.remove("a-carregar"));
