// Aviso curto em baixo do ecrã (snackbar do M3), com uma ação opcional, como "Anular".
// Fica numa região role="status" que já existe na página, para os leitores de ecrã o lerem.
// O tempo para enquanto o rato ou o foco estão no aviso, para dar tempo de carregar em "Anular".

const regiao = () => document.getElementById("avisos");
let fecharAtual = null;

export function mostrarAviso(texto, { acao, aoAgir, duracao = 8000 } = {}) {
  fecharAtual?.();

  const aviso = document.createElement("div");
  aviso.className = "aviso";
  const mensagem = document.createElement("span");
  mensagem.className = "aviso__texto md-typescale-body-medium";
  mensagem.textContent = texto;
  aviso.append(mensagem);

  let temporizador;
  const parar = () => clearTimeout(temporizador);
  const iniciar = () => {
    parar();
    temporizador = setTimeout(fechar, duracao);
  };
  function fechar() {
    parar();
    aviso.remove();
    if (fecharAtual === fechar) fecharAtual = null;
  }

  if (acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "aviso__acao md-typescale-label-large";
    botao.textContent = acao;
    botao.addEventListener("click", () => {
      fechar();
      aoAgir?.();
    });
    aviso.append(botao);
  }

  aviso.addEventListener("pointerenter", parar);
  aviso.addEventListener("pointerleave", iniciar);
  aviso.addEventListener("focusin", parar);
  aviso.addEventListener("focusout", iniciar);

  regiao().append(aviso);
  fecharAtual = fechar;
  iniciar();
  return fechar;
}
