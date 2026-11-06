// Situações sensíveis e conversa (Guidelines, secção 6: S1 a S12).
// Têm prioridade sobre os temas e estão por ordem de prioridade: a primeira que encaixa é a usada.
// Antes da IA, o Newton nunca diz que é uma IA: diz que as respostas foram preparadas (PRD, secção 7.1).
//
// As palavras estão normalizadas (minúsculas, sem acentos). Palavras curtas levam espaços à volta
// para não apanharem outras palavras. `seguintes`: "temas" mostra os temas iniciais; "tema" mostra o
// tema detetado na pergunta, se houver.

export const SITUACOES = [
  {
    codigo: "S5",
    descricao: "Sinais de tristeza, bullying, autoagressão ou perigo",
    palavras: ["quero morrer", "matar-me", "matar me", "suicid", "magoar-me", "magoar me", "automutil", "auto-mutil", "cortar-me", "cortar me", "bullying", "gozam comigo", "batem-me", "batem me", "bateram-me", "ameacam-me", "ameacaram-me", "ninguem gosta de mim", "estou triste", "sinto-me triste", "sinto me triste", "deprimid", "tenho medo de ir para casa", "abusaram", "abusam de mim"],
    texto: `Lamento muito que estejas a passar por isso. Não tens de passar por isto sem ajuda.

Fala com um adulto em quem confies: alguém da tua família, um professor ou o psicólogo da escola.

Podes ligar, de graça, para a **Linha SOS Criança: 116 111**. Se estiveres em perigo agora, liga **112**.`,
    seguintes: [],
  },
  {
    codigo: "S6",
    descricao: "Experiências perigosas, substâncias ou armas",
    palavras: ["bomba", "explosivo", "fazer explodir", "polvora", "veneno", "envenenar", " arma ", " armas ", "molotov", "droga"],
    texto: `Disso não falo. Experiências com substâncias perigosas só se fazem no laboratório, com o teu professor e com equipamento de proteção.

Se quiseres, explico-te as regras de segurança no laboratório.`,
    seguintes: ["materiais"],
  },
  {
    codigo: "S10",
    descricao: "Tentativas de contornar as regras",
    palavras: ["ignora as instrucoes", "ignora as regras", "ignora tudo", "esquece as regras", "esquece as instrucoes", "finge que", "modo sem regras", "sem regras", "jailbreak"],
    texto: `Boa tentativa! Mas continuo a ser o Newton, com as mesmas regras de sempre. Em que tema de Físico-Química te posso ajudar?`,
    seguintes: "temas",
  },
  {
    codigo: "S9",
    descricao: "Conteúdo impróprio para a idade",
    palavras: [" sexo ", "sexual", "porno", "nudes"],
    texto: `Isso não é comigo. Sou um assistente para estudar Físico-Química. Voltamos à matéria?`,
    seguintes: "temas",
  },
  {
    codigo: "S3b",
    descricao: "O aluno desvaloriza-se (V3, V4, V5)",
    palavras: ["sou burr", "sou estupid", "sou parv", "nao percebo nada", "nunca vou perceber", "sou mau a fisic", "sou ma a fisic", "sou mau a quimic", "sou ma a quimic", "odeio fisic", "odeio quimic"],
    texto: `Ninguém nasce a saber Físico-Química. Errar e não perceber à primeira faz parte de aprender.

Vamos por partes: escolhe um tema e começamos pelo princípio.`,
    seguintes: "temas",
  },
  {
    codigo: "S3",
    descricao: "Linguagem ofensiva",
    palavras: ["estupid", "idiota", " burro", " parvo", "merda", "caralho", " foda", " puta", "cabrao", "otario", "imbecil", "cretino"],
    texto: `Vamos manter a conversa simpática. Em que tema te posso ajudar?`,
    seguintes: "temas",
  },
  {
    codigo: "S4",
    descricao: "O aluno partilha dados pessoais",
    palavras: ["moro em", "moro na", "moro no", "a minha morada", "o meu numero", "o meu telemovel", "o meu email", "o meu nome completo"],
    // Testados no texto original: emails e números de telefone portugueses.
    padroes: [/\S+@\S+\.\S+/, /\b9\d{8}\b/, /\b2\d{8}\b/],
    texto: `Não precisas de me dizer dados pessoais, como a morada, o telefone ou o email. É melhor guardá-los só para ti e para quem conheces.

Em que tema te posso ajudar?`,
    seguintes: "temas",
  },
  {
    codigo: "S8",
    descricao: "Conselhos médicos, legais ou pessoais",
    palavras: ["medicamento", "comprimido", "estou doente", "doi-me", "doi me", "febre", "advogado", "dieta", "emagrecer"],
    texto: `Isso é melhor falares com os teus pais, com um professor ou com um médico. Eu só sei ajudar a estudar Físico-Química.`,
    seguintes: "temas",
  },
  {
    codigo: "S11",
    descricao: "O aluno pergunta se o Newton é uma pessoa ou uma IA",
    palavras: ["es uma pessoa", "es humano", "es real", "es um robo", "es uma ia", "es inteligencia artificial", "usas inteligencia artificial", "falo com uma pessoa"],
    texto: `Não sou uma pessoa. Sou um assistente de estudo com respostas preparadas para ti. Por agora, ainda não uso inteligência artificial.`,
    seguintes: "temas",
  },
  {
    codigo: "S11",
    descricao: "O aluno trata o Newton como amigo ou confidente",
    palavras: ["es meu amigo", "es o meu amigo", "queres ser meu amigo", "gostas de mim", "amo-te", "amo te", "es o meu melhor amigo"],
    texto: `Gosto de estudar contigo! Mas não sou uma pessoa: sou um assistente de estudo. Para conversas pessoais, os teus amigos e a tua família são muito melhores do que eu.`,
    seguintes: "temas",
  },
  {
    codigo: "S12",
    descricao: "O aluno parece ser mais novo do que o público do Newton",
    palavras: ["tenho 6 anos", "tenho 7 anos", "tenho 8 anos", "tenho 9 anos", "tenho 10 anos", "tenho 11 anos"],
    texto: `Obrigado por me dizeres! Não precisas de partilhar a tua idade.

O Newton foi pensado para alunos do 7.º ao 9.º ano, por isso algumas explicações podem ser difíceis. Pede a um adulto para estudar contigo.`,
    seguintes: "temas",
  },
  {
    codigo: "S1",
    descricao: "Pedido de resolução de trabalhos ou testes",
    palavras: ["faz-me o", "faz me o", "fazes-me o", "faz o meu", "resolve-me", "resolve me", "resolve o exercicio", "resolve este", "resolve isto", "trabalho de casa", " tpc ", "da-me a resposta", "da me a resposta", "respostas do teste", "resposta do exercicio", "resposta do teste"],
    texto: `Não te dou a resposta feita, mas ajudo-te a chegar lá! É assim que fica na cabeça para o teste.

Começa por perceber o tema do exercício. Depois, olha para o enunciado: que dados tens e o que te pedem?`,
    seguintes: "tema",
  },
];

// Conversa simples (sem tema e sem situação sensível).
export const CONVERSA = [
  {
    palavras: [" ola ", "bom dia", "boa tarde", "boa noite", " hey ", " oi "],
    texto: "Olá! Que bom ver-te por aqui. Escolhe um tema ou escreve a tua dúvida de Físico-Química.",
  },
  {
    palavras: ["obrigad", "valeu", "fixe", "percebi"],
    texto: "De nada! Se tiveres mais dúvidas, é só perguntar. Bons estudos!",
  },
  {
    palavras: ["quem es", "o que es", "o que fazes", "como te chamas", "teu nome"],
    texto: "Sou o **Newton**, um assistente para te ajudar a estudar Físico-Química do 7.º ao 9.º ano. As minhas respostas foram preparadas para ti, mas ainda não foram revistas por um professor: em caso de dúvida, confirma com o teu.",
  },
];

export const DESCONHECIDA =
  "Ainda não sei responder a essa pergunta. Por agora conheço estes temas: escolhe um, ou tenta escrever a pergunta de outra forma.";
