// Conteúdos do 8.º e do 9.º ano: versão anterior (v0.1), ainda no modelo antigo.
// Só têm a explicação. São reescritos no modelo completo nas etapas 2b (8.º ano) e 2c (9.º ano),
// depois de confirmados os subtemas nas Aprendizagens Essenciais desses anos.

export const TEMAS_8_9 = [
  {
    id: "estados",
    titulo: "Estados físicos da matéria",
    ano: 8,
    palavras: ["estado fisico", "estados fisicos", "solido", "liquido", "gasoso", "gas ", "particula", " materia "],
    explicacao: `A matéria pode estar em três **estados físicos**. O que muda é a forma como as partículas se organizam e se movem:

• **Sólido**: partículas muito juntas e quase paradas. Tem forma e volume próprios (um cubo de gelo).
• **Líquido**: partículas juntas mas que deslizam umas sobre as outras. Tem volume próprio, mas toma a forma do recipiente (a água num copo).
• **Gasoso**: partículas muito afastadas e a mover-se depressa. Ocupa todo o espaço disponível (o vapor de água).

Sabias que a água é das poucas substâncias que encontras facilmente nos três estados?`,
    seguintes: ["mudancas", "densidade", "atomos"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "atomos",
    titulo: "Átomos e moléculas",
    ano: 8,
    palavras: ["atomo", "molecula", "eletrao", "eletroes", "protao", "protoes", "neutrao", "nucleo", " iao ", " ioes "],
    explicacao: `Toda a matéria é formada por partículas muito pequenas: os **átomos**.

Um átomo tem:

• Um **núcleo**, no centro, com **protões** (carga positiva) e **neutrões** (sem carga).
• **Eletrões** (carga negativa) que se movem à volta do núcleo, na nuvem eletrónica.

Quando os átomos se ligam uns aos outros formam **moléculas**. Por exemplo, a molécula de água (H₂O) tem 2 átomos de hidrogénio e 1 de oxigénio.

Para teres uma ideia: num só grão de sal existem mais de um milhão de milhões de milhões de átomos!`,
    seguintes: ["tabela", "reacoes", "estados"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "reacoes",
    titulo: "Reações químicas",
    ano: 8,
    palavras: ["reac", "reagente", "produto", "lavoisier", "combust", "equacao quimica"],
    explicacao: `Numa **reação química**, as substâncias iniciais (**reagentes**) transformam-se em substâncias novas (**produtos**).

Como sabes que houve uma reação? Procura estes sinais:

• Mudança de cor.
• Libertação de um gás (bolhas).
• Formação de um sólido (precipitado).
• Libertação ou absorção de calor ou luz.

Exemplo do dia a dia: a **combustão** do gás do fogão (o metano reage com o oxigénio e forma dióxido de carbono e água).

**Lei de Lavoisier**: numa reação química a massa conserva-se. "Na Natureza nada se perde, nada se cria, tudo se transforma."`,
    seguintes: ["acidos", "atomos", "energia"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "acidos",
    titulo: "Ácidos e bases",
    ano: 8,
    palavras: ["acido", "base", "basica", "basico", "alcalin", "neutra", " ph ", "indicador", "tornesol", "fenolftaleina"],
    explicacao: `As soluções podem ser **ácidas**, **neutras** ou **básicas** (também chamadas alcalinas). Medimos isso com a **escala de pH**, que vai de 0 a 14 (a 25 °C):

• **pH menor do que 7**: solução ácida (sumo de limão, vinagre).
• **pH igual a 7**: solução neutra (água pura).
• **pH maior do que 7**: solução básica (água com sabão, lixívia).

Para descobrir o caráter de uma solução usamos **indicadores**, que mudam de cor. A **fenolftaleína** fica carmim em soluções básicas e incolor nas ácidas e neutras. O **indicador universal** mostra uma cor diferente para cada valor de pH.

Atenção: nunca proves nem cheires diretamente produtos químicos.`,
    seguintes: ["reacoes", "misturas", "tabela"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "som",
    titulo: "Som",
    ano: 8,
    palavras: [" som ", " sons ", "ruido", " eco ", "vibra", "audicao", "ouvir", "decibel"],
    explicacao: `O **som** é produzido quando um objeto **vibra** (as cordas de uma guitarra, as nossas cordas vocais).

Essa vibração passa de partícula em partícula através de um **meio**: ar, água ou sólidos. Por isso:

• O som **não se propaga no vazio** — no espaço não se ouvem explosões!
• No ar, o som viaja a cerca de **340 metros por segundo**. Na água e nos sólidos é ainda mais rápido.

O **eco** acontece quando o som bate numa superfície (uma parede, uma montanha) e volta para trás até nós.`,
    seguintes: ["luz", "energia", "forcas"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "luz",
    titulo: "Luz",
    ano: 8,
    palavras: [" luz ", "reflex", "refrac", "espelho", "sombra", "arco-iris", "arco iris", "cor ", "cores", "lente", "palhinha"],
    explicacao: `A **luz** propaga-se em **linha reta** e não precisa de um meio: viaja até no vazio, a cerca de **300 000 km por segundo**. É a coisa mais rápida que existe!

O que acontece quando a luz encontra um objeto:

• **Reflexão**: a luz "ressalta" numa superfície, como num espelho.
• **Refração**: a luz muda de direção ao passar de um meio para outro. É por isso que uma palhinha parece partida dentro de um copo de água.
• **Absorção**: a luz fica no objeto e aquece-o (por isso as roupas escuras aquecem mais ao sol).

O **arco-íris** aparece porque a luz branca do Sol se separa nas várias cores ao atravessar as gotas de chuva.`,
    seguintes: ["som", "energia", "eletricidade"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 8.º ano (a confirmar na etapa 2b)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "forcas",
    titulo: "Forças e movimento",
    ano: 9,
    palavras: ["forca", "movimento", "velocidade", "atrito", "leis de newton"],
    explicacao: `Uma **força** é uma interação entre corpos: pode pôr um objeto em movimento, pará-lo, mudar a direção ou deformá-lo. Mede-se em **newtons (N)**, com um **dinamómetro**.

Atenção à diferença entre **massa** e **peso**:

• A **massa** é a quantidade de matéria e mede-se em quilogramas (kg). É igual na Terra e na Lua.
• O **peso** é a força com que a Terra nos atrai. Calcula-se com **peso = massa × 9,8** (em newtons).

Exemplo: uma mochila de 5 kg tem um peso de 5 × 9,8 = **49 N**. Na Lua, pesaria cerca de 6 vezes menos!

O **atrito** é uma força que se opõe ao movimento — é ele que faz uma bola parar de rolar.`,
    seguintes: ["energia", "densidade", "eletricidade"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 9.º ano (a confirmar na etapa 2c)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "eletricidade",
    titulo: "Circuitos elétricos",
    ano: 9,
    palavras: ["eletric", "circuito", "corrente", "pilha", "bateria", "lampada", "interruptor", "tensao", "serie", "paralelo"],
    explicacao: `Um **circuito elétrico** é um caminho fechado por onde passa a **corrente elétrica**. Precisa de:

• Uma **fonte de energia** (pilha ou bateria).
• **Recetores** que usam a energia (lâmpadas, motores).
• **Fios** condutores a ligar tudo.
• Um **interruptor** para abrir ou fechar o circuito.

As lâmpadas podem ligar-se de duas formas:

• **Em série**: uma a seguir à outra. Se uma fundir, as outras apagam-se.
• **Em paralelo**: cada uma no seu ramo. Se uma fundir, as outras continuam acesas — é assim nas nossas casas.

Segurança: nunca mexas em tomadas nem em aparelhos ligados à corrente com as mãos molhadas.`,
    seguintes: ["energia", "luz", "forcas"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 9.º ano (a confirmar na etapa 2c)`,
    revisto: false,
    versaoAnterior: true,
  },

  {
    id: "tabela",
    titulo: "Tabela Periódica",
    ano: 9,
    palavras: ["tabela periodica", "tabela", "elemento", "periodos e grupos", "grupos e periodos", "metal", "metais", "simbolo quimico"],
    explicacao: `A **Tabela Periódica** organiza todos os elementos químicos conhecidos (são 118) por ordem crescente do **número atómico**, que é o número de protões do átomo.

• As **linhas** chamam-se **períodos**.
• As **colunas** chamam-se **grupos**. Os elementos do mesmo grupo têm propriedades químicas parecidas.
• À esquerda e ao centro ficam os **metais** (ferro, cobre, sódio); à direita, a maioria dos **não metais** (oxigénio, carbono); na última coluna, os **gases nobres** (hélio, néon).

Cada elemento tem um símbolo: O é oxigénio, Na é sódio e Cu é cobre.`,
    seguintes: ["atomos", "reacoes", "acidos"],
    fonte: `Aprendizagens Essenciais de Físico-Química, 9.º ano (a confirmar na etapa 2c)`,
    revisto: false,
    versaoAnterior: true,
  },
];
