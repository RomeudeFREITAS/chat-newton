// Base de conhecimento do Newton (sem IA): respostas pré-definidas por tema.
// Cada tema tem palavras-chave (sem acentos, em minúsculas), a resposta
// e sugestões de temas seguintes, mostradas como chips.
//
// Formatação das respostas: parágrafos separados por linha em branco,
// linhas começadas por "• " formam uma lista e **texto** fica a negrito.

export const TEMAS = [
  {
    id: "estados",
    titulo: "Estados físicos da matéria",
    palavras: ["estado fisico", "estados fisicos", "solido", "liquido", "gasoso", "gas ", "particula", "materia"],
    resposta: `A matéria pode estar em três **estados físicos**. O que muda é a forma como as partículas se organizam e se movem:

• **Sólido**: partículas muito juntas e quase paradas. Tem forma e volume próprios (um cubo de gelo).
• **Líquido**: partículas juntas mas que deslizam umas sobre as outras. Tem volume próprio, mas toma a forma do recipiente (a água num copo).
• **Gasoso**: partículas muito afastadas e a mover-se depressa. Ocupa todo o espaço disponível (o vapor de água).

Sabias que a água é das poucas substâncias que encontras facilmente nos três estados?`,
    seguintes: ["mudancas", "densidade", "atomos"],
  },
  {
    id: "mudancas",
    titulo: "Mudanças de estado",
    palavras: ["mudanca", "fusao", "solidifica", "vaporiza", "ebulic", "evapora", "condensa", "sublima", "derrete", "ferve", "congela"],
    resposta: `Quando aquecemos ou arrefecemos uma substância, ela pode mudar de estado físico:

• **Fusão**: sólido → líquido (o gelo a derreter).
• **Solidificação**: líquido → sólido (a água a congelar).
• **Vaporização**: líquido → gasoso. Pode ser lenta (**evaporação**, a roupa a secar) ou rápida (**ebulição**, a água a ferver).
• **Condensação**: gasoso → líquido (as gotas no espelho depois do banho).
• **Sublimação**: sólido → gasoso, sem passar a líquido (o gelo seco).

A água pura funde a 0 °C e entra em ebulição a 100 °C, ao nível do mar.`,
    seguintes: ["estados", "misturas", "energia"],
  },
  {
    id: "misturas",
    titulo: "Substâncias e misturas",
    palavras: ["mistura", "substancia", "homogene", "heterogene", "coloid", "solucao", "solucoes", "soluto", "solvente", "dissolve"],
    resposta: `Uma **substância** tem um só componente (água destilada, oxigénio). Uma **mistura** junta duas ou mais substâncias.

As misturas podem ser:

• **Homogéneas**: não consegues distinguir os componentes, nem ao microscópio. Também se chamam **soluções** (água com açúcar dissolvido).
• **Heterogéneas**: vês os componentes à vista desarmada (água e azeite, areia e pedras).
• **Coloidais**: parecem homogéneas, mas ao microscópio vês os componentes (leite, gelatina).

Numa solução, o que se dissolve é o **soluto** (o açúcar) e o que dissolve é o **solvente** (a água).`,
    seguintes: ["separacao", "densidade", "estados"],
  },
  {
    id: "separacao",
    titulo: "Separar misturas",
    palavras: ["separ", "decant", "filtr", "peneira", "destila", "cristaliza", "iman", "magnetic"],
    resposta: `Há várias técnicas para separar os componentes de uma mistura. A escolha depende do tipo de mistura:

• **Peneiração**: sólidos com grãos de tamanhos diferentes (farinha e grumos).
• **Separação magnética**: quando um dos sólidos é atraído por um íman (limalha de ferro e areia).
• **Decantação**: líquidos que não se misturam (água e azeite) ou um sólido que assenta no fundo.
• **Filtração**: um sólido que não se dissolve num líquido (areia e água).
• **Evaporação** ou **cristalização**: recuperar o sólido dissolvido (sal da água do mar, nas salinas).
• **Destilação**: separar um líquido de uma solução, aquecendo e voltando a arrefecer o vapor.

No laboratório usa sempre óculos de proteção e pede ajuda ao professor para aquecer.`,
    seguintes: ["misturas", "mudancas", "densidade"],
  },
  {
    id: "densidade",
    titulo: "Densidade",
    palavras: ["densidade", "massa volumica", "flutua", "afunda", "boia"],
    resposta: `A **densidade** (ou massa volúmica) diz quanta massa existe em cada unidade de volume de um material:

**densidade = massa ÷ volume**

Mede-se, por exemplo, em g/cm³. A água tem uma densidade de cerca de **1 g/cm³**.

• Um material **menos denso** do que a água **flutua** (o azeite, cerca de 0,92 g/cm³, ou a cortiça).
• Um material **mais denso** do que a água **afunda** (uma pedra, um prego de ferro).

Exemplo: um bloco com 20 g de massa e 10 cm³ de volume tem densidade 20 ÷ 10 = **2 g/cm³**, por isso afunda na água.`,
    seguintes: ["estados", "misturas", "forcas"],
  },
  {
    id: "atomos",
    titulo: "Átomos e moléculas",
    palavras: ["atomo", "molecula", "eletrao", "eletroes", "protao", "protoes", "neutrao", "nucleo", " iao ", " ioes "],
    resposta: `Toda a matéria é formada por partículas muito pequenas: os **átomos**.

Um átomo tem:

• Um **núcleo**, no centro, com **protões** (carga positiva) e **neutrões** (sem carga).
• **Eletrões** (carga negativa) que se movem à volta do núcleo, na nuvem eletrónica.

Quando os átomos se ligam uns aos outros formam **moléculas**. Por exemplo, a molécula de água (H₂O) tem 2 átomos de hidrogénio e 1 de oxigénio.

Para teres uma ideia: num só grão de sal existem mais de um milhão de milhões de milhões de átomos!`,
    seguintes: ["tabela", "reacoes", "estados"],
  },
  {
    id: "tabela",
    titulo: "Tabela Periódica",
    palavras: ["tabela periodica", "tabela", "elemento", "periodo", "grupo", "metal", "metais", "simbolo quimico"],
    resposta: `A **Tabela Periódica** organiza todos os elementos químicos conhecidos (são 118) por ordem crescente do **número atómico**, que é o número de protões do átomo.

• As **linhas** chamam-se **períodos**.
• As **colunas** chamam-se **grupos**. Os elementos do mesmo grupo têm propriedades químicas parecidas.
• À esquerda e ao centro ficam os **metais** (ferro, cobre, sódio); à direita, a maioria dos **não metais** (oxigénio, carbono); na última coluna, os **gases nobres** (hélio, néon).

Cada elemento tem um símbolo: O é oxigénio, Na é sódio e Cu é cobre.`,
    seguintes: ["atomos", "reacoes", "acidos"],
  },
  {
    id: "reacoes",
    titulo: "Reações químicas",
    palavras: ["reac", "reagente", "produto", "lavoisier", "combust", "transformacao quimica", "equacao quimica"],
    resposta: `Numa **reação química**, as substâncias iniciais (**reagentes**) transformam-se em substâncias novas (**produtos**).

Como sabes que houve uma reação? Procura estes sinais:

• Mudança de cor.
• Libertação de um gás (bolhas).
• Formação de um sólido (precipitado).
• Libertação ou absorção de calor ou luz.

Exemplo do dia a dia: a **combustão** do gás do fogão (o metano reage com o oxigénio e forma dióxido de carbono e água).

**Lei de Lavoisier**: numa reação química a massa conserva-se. "Na Natureza nada se perde, nada se cria, tudo se transforma."`,
    seguintes: ["acidos", "atomos", "energia"],
  },
  {
    id: "acidos",
    titulo: "Ácidos e bases",
    palavras: ["acido", "base", "basica", "basico", "alcalin", "neutra", " ph ", "indicador", "tornesol", "fenolftaleina"],
    resposta: `As soluções podem ser **ácidas**, **neutras** ou **básicas** (também chamadas alcalinas). Medimos isso com a **escala de pH**, que vai de 0 a 14 (a 25 °C):

• **pH menor do que 7**: solução ácida (sumo de limão, vinagre).
• **pH igual a 7**: solução neutra (água pura).
• **pH maior do que 7**: solução básica (água com sabão, lixívia).

Para descobrir o caráter de uma solução usamos **indicadores**, que mudam de cor. A **fenolftaleína** fica carmim em soluções básicas e incolor nas ácidas e neutras. O **indicador universal** mostra uma cor diferente para cada valor de pH.

Atenção: nunca proves nem cheires diretamente produtos químicos.`,
    seguintes: ["reacoes", "misturas", "tabela"],
  },
  {
    id: "som",
    titulo: "Som",
    palavras: [" som ", " sons ", "ruido", " eco ", "vibra", "audicao", "ouvir", "decibel"],
    resposta: `O **som** é produzido quando um objeto **vibra** (as cordas de uma guitarra, as nossas cordas vocais).

Essa vibração passa de partícula em partícula através de um **meio**: ar, água ou sólidos. Por isso:

• O som **não se propaga no vazio** — no espaço não se ouvem explosões!
• No ar, o som viaja a cerca de **340 metros por segundo**. Na água e nos sólidos é ainda mais rápido.

O **eco** acontece quando o som bate numa superfície (uma parede, uma montanha) e volta para trás até nós.`,
    seguintes: ["luz", "energia", "forcas"],
  },
  {
    id: "luz",
    titulo: "Luz",
    palavras: ["luz", "reflex", "refrac", "espelho", "sombra", "arco-iris", "arco iris", "cor ", "cores", "lente", "palhinha"],
    resposta: `A **luz** propaga-se em **linha reta** e não precisa de um meio: viaja até no vazio, a cerca de **300 000 km por segundo**. É a coisa mais rápida que existe!

O que acontece quando a luz encontra um objeto:

• **Reflexão**: a luz "ressalta" numa superfície, como num espelho.
• **Refração**: a luz muda de direção ao passar de um meio para outro. É por isso que uma palhinha parece partida dentro de um copo de água.
• **Absorção**: a luz fica no objeto e aquece-o (por isso as roupas escuras aquecem mais ao sol).

O **arco-íris** aparece porque a luz branca do Sol se separa nas várias cores ao atravessar as gotas de chuva.`,
    seguintes: ["som", "energia", "eletricidade"],
  },
  {
    id: "forcas",
    titulo: "Forças e movimento",
    palavras: ["forca", "movimento", "velocidade", "peso", "gravidade", "atrito", "dinamometro", "leis de newton"],
    resposta: `Uma **força** é uma interação entre corpos: pode pôr um objeto em movimento, pará-lo, mudar a direção ou deformá-lo. Mede-se em **newtons (N)**, com um **dinamómetro**.

Atenção à diferença entre **massa** e **peso**:

• A **massa** é a quantidade de matéria e mede-se em quilogramas (kg). É igual na Terra e na Lua.
• O **peso** é a força com que a Terra nos atrai. Calcula-se com **peso = massa × 9,8** (em newtons).

Exemplo: uma mochila de 5 kg tem um peso de 5 × 9,8 = **49 N**. Na Lua, pesaria cerca de 6 vezes menos!

O **atrito** é uma força que se opõe ao movimento — é ele que faz uma bola parar de rolar.`,
    seguintes: ["energia", "densidade", "eletricidade"],
  },
  {
    id: "eletricidade",
    titulo: "Circuitos elétricos",
    palavras: ["eletric", "circuito", "corrente", "pilha", "bateria", "lampada", "interruptor", "tensao", "serie", "paralelo"],
    resposta: `Um **circuito elétrico** é um caminho fechado por onde passa a **corrente elétrica**. Precisa de:

• Uma **fonte de energia** (pilha ou bateria).
• **Recetores** que usam a energia (lâmpadas, motores).
• **Fios** condutores a ligar tudo.
• Um **interruptor** para abrir ou fechar o circuito.

As lâmpadas podem ligar-se de duas formas:

• **Em série**: uma a seguir à outra. Se uma fundir, as outras apagam-se.
• **Em paralelo**: cada uma no seu ramo. Se uma fundir, as outras continuam acesas — é assim nas nossas casas.

Segurança: nunca mexas em tomadas nem em aparelhos ligados à corrente com as mãos molhadas.`,
    seguintes: ["energia", "luz", "forcas"],
  },
  {
    id: "energia",
    titulo: "Energia",
    palavras: ["energia", "renovav", "fonte", "solar", "eolica", "combustive", "calor", "temperatura"],
    resposta: `A **energia** está em tudo o que acontece: aquecer, mover, iluminar. Mede-se em **joules (J)**.

A regra mais importante: a energia **não se cria nem se destrói**, apenas se **transfere** ou se **transforma**. Numa lâmpada, a energia elétrica transforma-se em luz e calor.

As **fontes de energia** podem ser:

• **Renováveis**: não se esgotam (Sol, vento, água, ondas).
• **Não renováveis**: um dia acabam e poluem mais (petróleo, carvão, gás natural).

Calor e temperatura não são a mesma coisa: a **temperatura** diz quão quente está um corpo; o **calor** é a energia que passa de um corpo mais quente para um mais frio.`,
    seguintes: ["eletricidade", "mudancas", "reacoes"],
  },
];

// Temas mostrados no ecrã de boas-vindas.
export const TEMAS_INICIAIS = ["estados", "misturas", "densidade", "tabela", "acidos", "som"];

const CONVERSA = [
  {
    palavras: [" ola ", "bom dia", "boa tarde", "boa noite", " hey ", " oi "],
    resposta: "Olá! Que bom ver-te por aqui. Escolhe um tema ou escreve a tua dúvida de Físico-Química.",
  },
  {
    palavras: ["obrigad", "valeu", "fixe", "percebi"],
    resposta: "De nada! Se tiveres mais dúvidas, é só perguntar. Bons estudos!",
  },
  {
    palavras: ["quem es", "o que es", "o que fazes", "como te chamas", "teu nome"],
    resposta:
      "Sou o **Newton**, um assistente para te ajudar a estudar Físico-Química. Ainda estou a aprender, por isso conheço só alguns temas — mas vou saber cada vez mais!",
  },
];

export const RESPOSTA_DESCONHECIDA = {
  resposta:
    "Ainda não sei responder a essa pergunta. Por agora conheço estes temas — escolhe um, ou tenta escrever a pergunta de outra forma.",
  seguintes: TEMAS_INICIAIS,
};

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

/** Escolhe a melhor resposta para a pergunta do aluno. */
export function responder(pergunta) {
  const texto = normalizar(pergunta);

  let melhor = null;
  let melhorPontos = 0;
  for (const tema of TEMAS) {
    const pontos = pontuacao(texto, tema.palavras);
    if (pontos > melhorPontos) {
      melhor = tema;
      melhorPontos = pontos;
    }
  }
  if (melhor) return melhor;

  const conversa = CONVERSA.find((c) => pontuacao(texto, c.palavras) > 0);
  if (conversa) return { resposta: conversa.resposta, seguintes: [] };

  return RESPOSTA_DESCONHECIDA;
}
