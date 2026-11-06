// Conteúdos do 7.º ano (etapa 2a do PRD).
// Organizados pelos subtemas das Aprendizagens Essenciais de Físico-Química, 7.º ano (DGE, março de 2026).
// Estes textos são a futura base de conhecimento da IA (Guidelines I2, I3, I9).
//
// Modelo de cada tema:
//   explicacao   resposta principal, até cerca de 120 palavras (Guidelines I7)
//   simples      versão mais simples, para "Explica de forma mais simples" (Fase 5)
//   exemplo      exemplo do dia a dia, para "Dá-me um exemplo" (Fase 5)
//   verificacao  pergunta para o aluno verificar se percebeu, com a resposta (Fase 5)
//   treino       3 perguntas de escolha múltipla para o "Testar-me" (Fase 5); `certa` é o índice da opção certa
//   fonte        ano, tema e subtema das Aprendizagens Essenciais (Guidelines P25, I9)
//   revisto      false até um professor de Físico-Química rever o tema (PRD: condição para o lançamento real)
//
// Formatação dos textos: parágrafos separados por linha em branco, linhas "• " formam uma lista, **texto** fica a negrito.

const AE = "Aprendizagens Essenciais de Físico-Química, 7.º ano (DGE, março de 2026)";

export const TEMAS_7 = [
  {
    id: "universo",
    titulo: "Universo e distâncias",
    ano: 7,
    tema: "Espaço",
    subtema: "Universo e Distâncias no Universo",
    palavras: ["universo", "galaxia", "via lactea", "big bang", "ano-luz", "ano luz", "anos-luz", "anos luz", "unidade astronomica", "estrela", "exoplaneta", "enxame", "constelac"],
    explicacao: `O **Universo** é tudo o que existe. Organiza-se em vários níveis:

• Os **planetas** giram à volta de **estrelas**, formando **sistemas planetários**. Os planetas de outras estrelas chamam-se **exoplanetas**.
• As estrelas agrupam-se em **enxames de estrelas** e em **galáxias**. A nossa galáxia é a **Via Láctea**, e o Sistema Solar fica num dos seus braços.

Segundo a teoria do **Big Bang**, o Universo começou há cerca de 13 800 milhões de anos, muito quente e denso, e continua a expandir-se.

Para distâncias tão grandes, usamos unidades próprias:

• **Unidade astronómica (UA)**: a distância média da Terra ao Sol, cerca de 150 milhões de km.
• **Ano-luz**: a distância que a luz percorre num ano, cerca de 9,5 biliões de km.`,
    simples: `Pensa em moradas: a Terra é a tua casa, o Sistema Solar é o teu bairro, a Via Láctea é a tua cidade e o Universo é o mundo inteiro. Como as distâncias são enormes, usamos o **ano-luz**: a distância que a luz, a coisa mais rápida que existe, percorre num ano.`,
    exemplo: `A luz do Sol demora cerca de 8 minutos a chegar à Terra. A luz de **Proxima Centauri**, a estrela mais próxima depois do Sol, demora cerca de 4,2 anos: está a 4,2 anos-luz. Quando olhas para uma estrela, estás a ver a luz que saiu de lá há muito tempo!`,
    verificacao: {
      pergunta: "Porque é que não medimos a distância entre estrelas em quilómetros?",
      resposta: "Porque os números seriam enormes e difíceis de usar. Por isso usamos o ano-luz, e a unidade astronómica dentro do Sistema Solar.",
    },
    treino: [
      {
        pergunta: "O que é um ano-luz?",
        opcoes: ["O tempo que a luz demora a dar a volta à Terra", "A distância que a luz percorre num ano", "O tempo que a Terra demora a dar a volta ao Sol", "A distância da Terra ao Sol"],
        certa: 1,
        explicacao: "Apesar do nome, o ano-luz é uma unidade de distância, e não de tempo: é a distância que a luz percorre num ano.",
      },
      {
        pergunta: "Em que galáxia fica o Sistema Solar?",
        opcoes: ["Andrómeda", "Via Láctea", "Nuvem de Magalhães", "Orionte"],
        certa: 1,
        explicacao: "O Sistema Solar fica num dos braços da Via Láctea, uma galáxia em espiral.",
      },
      {
        pergunta: "Qual destas sequências está ordenada do mais pequeno para o maior?",
        opcoes: ["Galáxia, Sistema Solar, Universo", "Sistema Solar, galáxia, Universo", "Universo, galáxia, Sistema Solar", "Sistema Solar, Universo, galáxia"],
        certa: 1,
        explicacao: "O Sistema Solar faz parte de uma galáxia (a Via Láctea), e as galáxias fazem parte do Universo.",
      },
    ],
    seguintes: ["sistema-solar", "terra-lua", "luz"],
    fonte: `${AE} · Espaço · Universo e Distâncias no Universo`,
    revisto: false,
  },

  {
    id: "sistema-solar",
    titulo: "Sistema Solar",
    ano: 7,
    tema: "Espaço",
    subtema: "Sistema Solar",
    palavras: ["sistema solar", "planeta", "asteroide", "cometa", "meteor", "satelite", "plutao", "jupiter", "saturno", "marte", "venus", "mercurio", "urano", "neptuno", "netuno", "periodo", "periodo de translacao", "cadente", "estrela cadente", "estrelas cadentes"],
    explicacao: `O **Sistema Solar** é formado pelo **Sol**, uma estrela, e por tudo o que gira à sua volta:

• **8 planetas**. Mercúrio, Vénus, Terra e Marte são **rochosos**; Júpiter, Saturno, Úrano e Neptuno são **gasosos** e muito maiores.
• **Planetas anões**, como Plutão.
• **Satélites naturais**, como a Lua.
• **Asteroides**, **cometas** e **meteoroides**. Quando um meteoroide entra na atmosfera e brilha, é um **meteoro** (a "estrela cadente"); se chegar ao chão, é um **meteorito**.

Quanto mais longe do Sol está um planeta, mais tempo demora a dar uma volta completa à sua volta. Esse tempo é o **período de translação**: a Terra demora um ano; Neptuno, cerca de 165 anos.`,
    simples: `O Sol está no centro e 8 planetas andam à volta dele, cada um no seu caminho. Os 4 mais perto do Sol são pequenos e feitos de rocha; os 4 mais longe são enormes e feitos sobretudo de gases. Quanto mais longe, mais tempo demoram a dar uma volta.`,
    exemplo: `Um ano em Marte dura quase 2 anos da Terra (cerca de 687 dias). Se vivesses em Marte, farias anos mais ou menos metade das vezes!`,
    verificacao: {
      pergunta: "Porque é que Neptuno demora muito mais tempo do que a Terra a dar uma volta ao Sol?",
      resposta: "Porque está muito mais longe do Sol: o caminho que percorre é muito maior.",
    },
    treino: [
      {
        pergunta: "Qual destes planetas é rochoso?",
        opcoes: ["Júpiter", "Saturno", "Marte", "Neptuno"],
        certa: 2,
        explicacao: "Mercúrio, Vénus, Terra e Marte são rochosos. Júpiter, Saturno, Úrano e Neptuno são gasosos.",
      },
      {
        pergunta: "O que é um meteorito?",
        opcoes: ["Um planeta muito pequeno", "Um pedaço de rocha do espaço que chega à superfície da Terra", "Uma estrela que cai", "A cauda de um cometa"],
        certa: 1,
        explicacao: "As \"estrelas cadentes\" são meteoros: brilham na atmosfera. Só os fragmentos que chegam ao chão se chamam meteoritos.",
      },
      {
        pergunta: "Qual destes planetas tem o período de translação mais longo?",
        opcoes: ["Mercúrio", "Terra", "Júpiter", "Neptuno"],
        certa: 3,
        explicacao: "Neptuno é o planeta mais afastado do Sol, por isso é o que demora mais tempo a dar uma volta completa.",
      },
    ],
    seguintes: ["terra-lua", "universo", "energia"],
    fonte: `${AE} · Espaço · Sistema Solar`,
    revisto: false,
  },

  {
    id: "terra-lua",
    titulo: "Terra, Lua e gravidade",
    ano: 7,
    tema: "Espaço",
    subtema: "A Terra, a Lua e as Forças Gravíticas",
    palavras: [" lua ", "fases da lua", "eclipse", "estacoes do ano", "estacao do ano", "dia e noite", "dias e noites", "rotacao", "translacao", "gravidade", "gravitica", "forca gravitica", " peso ", "massa e peso", "peso e massa", "dinamometro"],
    explicacao: `Os movimentos da Terra e da Lua explicam vários fenómenos:

• A **rotação** da Terra sobre si própria (24 horas) explica os **dias e as noites**.
• A **translação** da Terra à volta do Sol (um ano), junto com a inclinação do seu eixo, explica as **estações do ano**.
• O movimento da Lua à volta da Terra explica as **fases da Lua**. Quando o Sol, a Terra e a Lua se alinham, há **eclipses**.

Tudo isto é mantido pela **força gravítica**: atua à distância, é sempre atrativa e diminui quando a distância aumenta.

Atenção: a **massa** é a quantidade de matéria (em kg) e não muda; o **peso** é a força gravítica que atua num corpo, medida em **newtons (N)** com um **dinamómetro**.`,
    simples: `A Terra gira sobre si própria, e é por isso que há dia e noite. Também anda à volta do Sol e tem o eixo inclinado, e é por isso que há estações. A gravidade é o "puxão" que a Terra faz em tudo o que está perto dela: esse puxão é o teu peso. A tua massa é a quantidade de matéria do teu corpo, e essa não muda.`,
    exemplo: `Um astronauta com 70 kg continua a ter 70 kg na Lua: a massa não muda. Mas o seu peso fica cerca de 6 vezes menor, porque a Lua puxa com menos força do que a Terra. É por isso que os astronautas dão saltos enormes na Lua!`,
    verificacao: {
      pergunta: "Se levares uma mochila para a Lua, o que muda: a massa ou o peso?",
      resposta: "Muda o peso, que fica cerca de 6 vezes menor. A massa continua igual.",
    },
    treino: [
      {
        pergunta: "O que explica a sucessão dos dias e das noites?",
        opcoes: ["A translação da Terra", "A rotação da Terra", "O movimento da Lua", "A distância da Terra ao Sol"],
        certa: 1,
        explicacao: "A Terra gira sobre si própria em 24 horas: a metade virada para o Sol tem dia, a outra tem noite.",
      },
      {
        pergunta: "Em que unidade se mede o peso?",
        opcoes: ["Quilograma (kg)", "Grama (g)", "Newton (N)", "Litro (L)"],
        certa: 2,
        explicacao: "O peso é uma força, por isso mede-se em newtons, com um dinamómetro. A massa é que se mede em quilogramas.",
      },
      {
        pergunta: "O que acontece à força gravítica que a Terra exerce num corpo quando ele se afasta da Terra?",
        opcoes: ["Aumenta", "Diminui", "Fica igual", "Passa a empurrar o corpo"],
        certa: 1,
        explicacao: "A força gravítica diminui quando a distância ao centro da Terra aumenta, e é sempre atrativa.",
      },
    ],
    seguintes: ["sistema-solar", "universo", "forcas"],
    fonte: `${AE} · Espaço · A Terra, a Lua e as Forças Gravíticas`,
    revisto: false,
  },

  {
    id: "materiais",
    titulo: "Materiais e segurança no laboratório",
    ano: 7,
    tema: "Materiais",
    subtema: "Constituição do Mundo Material",
    palavras: ["laboratorio", "pictograma", "simbolo de perigo", "simbolos de perigo", "seguranca", "rotulo", "reciclar", "reciclagem", "reutiliz", "materiais naturais", "material natural", "sintetic", "tipos de materiais", "materiais", " material ", " bata "],
    explicacao: `Tudo o que nos rodeia é feito de **materiais**. Podemos agrupá-los pela origem, **naturais** (madeira, algodão) ou **fabricados pelo ser humano** (plástico, vidro), e pelas propriedades, como dissolverem-se em água ou conduzirem a corrente elétrica.

Os materiais são recursos limitados: por isso devemos **reduzir, reutilizar e reciclar**.

No laboratório, a segurança vem primeiro:

• Bata, óculos de proteção e cabelo apanhado.
• Nunca cheirar, provar ou tocar em produtos sem indicação do professor.
• Ler sempre os **pictogramas de perigo** dos rótulos: losangos com contorno vermelho que mostram, por exemplo, se um produto é inflamável, corrosivo ou tóxico.

Os mesmos pictogramas aparecem em produtos de casa, como a lixívia.`,
    simples: `Os materiais são aquilo de que as coisas são feitas. Uns vêm da natureza, outros são fabricados. No laboratório há regras para não te magoares: usa óculos, não proves nem cheires nada e olha para os símbolos de perigo nos frascos.`,
    exemplo: `Procura o rótulo da lixívia lá em casa, sem abrir a embalagem. Vais encontrar um losango com contorno vermelho e o símbolo de **corrosivo**: um líquido a "comer" uma mão e uma superfície. Quer dizer que pode queimar a pele e os olhos.`,
    verificacao: {
      pergunta: "Porque é que nunca se deve provar ou cheirar diretamente um produto no laboratório?",
      resposta: "Porque pode ser tóxico ou corrosivo e fazer mal, mesmo em pequenas quantidades. No laboratório só se faz o que o professor indicar.",
    },
    treino: [
      {
        pergunta: "Qual destes materiais é fabricado pelo ser humano?",
        opcoes: ["Madeira", "Lã", "Plástico", "Granito"],
        certa: 2,
        explicacao: "O plástico é fabricado a partir de outras matérias-primas, como o petróleo. A madeira, a lã e o granito existem na natureza.",
      },
      {
        pergunta: "Como são os pictogramas de perigo dos rótulos?",
        opcoes: ["Círculos azuis", "Losangos com contorno vermelho", "Triângulos verdes", "Quadrados amarelos"],
        certa: 1,
        explicacao: "Os pictogramas de perigo são losangos com contorno vermelho e um símbolo preto sobre fundo branco.",
      },
      {
        pergunta: "O que deves fazer antes de usar um produto no laboratório?",
        opcoes: ["Cheirá-lo para o identificar", "Ler o rótulo e seguir as indicações do professor", "Prová-lo em pequena quantidade", "Misturá-lo com água"],
        certa: 1,
        explicacao: "O rótulo e os pictogramas dizem que perigos o produto tem. O professor diz como se usa em segurança.",
      },
    ],
    seguintes: ["misturas", "transformacoes", "separacao"],
    fonte: `${AE} · Materiais · Constituição do Mundo Material`,
    revisto: false,
  },

  {
    id: "misturas",
    titulo: "Substâncias e misturas",
    ano: 7,
    tema: "Materiais",
    subtema: "Substâncias e Misturas",
    palavras: ["mistura", "substancia", "homogene", "heterogene", "miscive", "imiscive", "solucao", "solucoes", "soluto", "solvente", "dissolve", "saturada", "diluida", "concentrada", "concentracao"],
    explicacao: `Uma **substância** tem um só componente, como a água destilada ou o oxigénio. Uma **mistura** tem dois ou mais. A maior parte dos materiais à nossa volta são misturas: basta ler os rótulos!

• **Mistura homogénea**: não se distinguem os componentes (água com sal dissolvido).
• **Mistura heterogénea**: veem-se os componentes (areia e água).

Líquidos que se misturam são **miscíveis** (água e álcool); os que não se misturam são **imiscíveis** (água e azeite).

Numa **solução**, o **soluto** dissolve-se no **solvente**. A solução pode ser **diluída**, **concentrada** ou **saturada** (quando já não dissolve mais soluto).

**Concentração em massa = massa de soluto ÷ volume de solução**, por exemplo em g/L.`,
    simples: `Uma substância é uma coisa "pura", com um só componente. Uma mistura junta várias. Se não consegues ver as partes, é homogénea (como o chá com açúcar). Se as vês, é heterogénea (como uma salada). Numa solução, o que se dissolve é o soluto e o que dissolve é o solvente.`,
    exemplo: `Dissolves 20 g de açúcar em água e ficas com 0,5 L de limonada. A concentração em massa é 20 g ÷ 0,5 L = **40 g/L**: em cada litro desta limonada haveria 40 g de açúcar.`,
    verificacao: {
      pergunta: "O ar é uma substância ou uma mistura?",
      resposta: "É uma mistura homogénea: tem azoto, oxigénio, árgon, dióxido de carbono e outros gases, mas não os conseguimos distinguir.",
    },
    treino: [
      {
        pergunta: "Água e azeite formam uma mistura…",
        opcoes: ["homogénea, porque são os dois líquidos", "heterogénea, porque se veem os dois componentes", "que é uma substância", "saturada"],
        certa: 1,
        explicacao: "Água e azeite são imiscíveis: não se misturam e veem-se as duas camadas.",
      },
      {
        pergunta: "Numa solução de água com sal, qual é o soluto?",
        opcoes: ["A água", "O sal", "A solução", "Nenhum dos dois"],
        certa: 1,
        explicacao: "O soluto é o que se dissolve (o sal). O solvente é o que dissolve (a água).",
      },
      {
        pergunta: "Dissolveste 10 g de sal em água e ficaste com 0,2 L de solução. Qual é a concentração em massa?",
        opcoes: ["2 g/L", "20 g/L", "50 g/L", "0,02 g/L"],
        certa: 2,
        explicacao: "Concentração em massa = 10 g ÷ 0,2 L = 50 g/L.",
      },
    ],
    seguintes: ["separacao", "densidade", "materiais"],
    fonte: `${AE} · Materiais · Substâncias e Misturas`,
    revisto: false,
  },

  {
    id: "transformacoes",
    titulo: "Transformações físicas e químicas",
    ano: 7,
    tema: "Materiais",
    subtema: "Transformações Físicas e Químicas",
    palavras: ["transformac", "fisica ou quimica", "fisico ou quimico", "fisicas e quimicas", "fisicas ou quimicas", "equacao de palavras", "enferruj", "ferrugem", " arder ", "queima"],
    explicacao: `Os materiais podem sofrer dois tipos de transformações:

• **Transformação física**: a substância continua a ser a mesma; só muda de forma ou de estado. Exemplos: o gelo a derreter, o papel a ser rasgado, o açúcar a dissolver-se.
• **Transformação química** (ou **reação química**): formam-se substâncias novas. Exemplos: a madeira a arder, o ferro a enferrujar, um bolo a cozer.

Pode acontecer ao juntar substâncias, ou por ação do calor, da luz, de uma ação mecânica ou da corrente elétrica. Há sinais que a denunciam: mudança de cor, libertação de um gás, formação de um sólido, libertação de luz ou de calor.

Representa-se com uma "equação" de palavras, dos **reagentes** para os **produtos**:

**ferro + oxigénio → óxido de ferro**`,
    simples: `Numa transformação física, a coisa muda de aspeto mas continua a ser a mesma: o gelo que derrete continua a ser água. Numa transformação química, aparece uma coisa nova que não existia antes: a madeira que arde transforma-se em cinzas e fumo.`,
    exemplo: `Quando cozes um ovo, a clara passa de transparente a branca e já não volta atrás: é uma transformação química. Quando fazes gelo e depois o deixas derreter, volta a ser água: é uma transformação física.`,
    verificacao: {
      pergunta: "Dissolver açúcar no leite é uma transformação física ou química?",
      resposta: "É física: o açúcar continua a ser açúcar, só fica misturado no leite.",
    },
    treino: [
      {
        pergunta: "Qual destas é uma transformação química?",
        opcoes: ["Rasgar papel", "Derreter manteiga", "Queimar um fósforo", "Dissolver sal em água"],
        certa: 2,
        explicacao: "Ao queimar, o fósforo forma substâncias novas (cinzas, fumo, gases). Nas outras, a substância continua a mesma.",
      },
      {
        pergunta: "Numa reação química, como se chamam as substâncias iniciais?",
        opcoes: ["Produtos", "Reagentes", "Soluções", "Misturas"],
        certa: 1,
        explicacao: "Os reagentes transformam-se nos produtos: reagentes → produtos.",
      },
      {
        pergunta: "Qual destes sinais indica que houve uma reação química?",
        opcoes: ["Um copo partiu-se", "Apareceram bolhas de gás e a cor mudou", "A água arrefeceu", "O gelo ficou líquido"],
        certa: 1,
        explicacao: "A libertação de um gás e a mudança de cor indicam que se formaram substâncias novas.",
      },
    ],
    seguintes: ["mudancas", "materiais", "reacoes"],
    fonte: `${AE} · Materiais · Transformações Físicas e Químicas`,
    revisto: false,
  },

  {
    id: "mudancas",
    titulo: "Mudanças de estado",
    ano: 7,
    tema: "Materiais",
    subtema: "Transformações Físicas e Químicas · Propriedades Físicas e Químicas dos Materiais",
    palavras: ["mudanca de estado", "mudancas de estado", "fusao", "solidifica", "vaporiza", "ebulic", "evapora", "condensa", "sublima", "derrete", "ferve", "congela", "ponto de fusao", "pontos de fusao", "ponto de ebulicao", "pontos de ebulicao", "temperatura de fusao", "temperatura de ebulicao", "volatil", "grafico temperatura", "patamar"],
    explicacao: `As **mudanças de estado** são transformações físicas: a substância continua a ser a mesma.

• **Fusão**: sólido → líquido. **Solidificação**: líquido → sólido.
• **Vaporização**: líquido → gasoso. Pode ser lenta e só à superfície (**evaporação**) ou em todo o líquido, com bolhas (**ebulição**).
• **Condensação**: gasoso → líquido.
• **Sublimação**: sólido → gasoso, sem passar a líquido.

Cada substância pura funde e ferve a uma temperatura bem definida: o **ponto de fusão** e o **ponto de ebulição**. A água pura, à pressão atmosférica normal, funde a **0 °C** e ferve a **100 °C**. Estes valores ajudam a saber se uma substância é pura.

Substâncias com ponto de ebulição baixo são **voláteis**: evaporam facilmente, como o álcool.`,
    simples: `Se aqueces gelo, ele derrete: é a fusão. Se continuares a aquecer, a água ferve e passa a vapor: é a ebulição. Se arrefeceres o vapor, volta a ser água: é a condensação. A água pura derrete a 0 °C e ferve a 100 °C.`,
    exemplo: `Depois de um banho quente, o espelho fica embaciado. O vapor de água do ar toca no vidro frio e passa a líquido: é a condensação. As gotinhas que vês são água.`,
    verificacao: {
      pergunta: "A roupa estendida seca sem a água ferver. Que mudança de estado é essa?",
      resposta: "É a evaporação: a água passa a vapor devagar, à superfície, a uma temperatura abaixo do ponto de ebulição.",
    },
    treino: [
      {
        pergunta: "Como se chama a passagem do estado líquido ao estado sólido?",
        opcoes: ["Fusão", "Solidificação", "Condensação", "Sublimação"],
        certa: 1,
        explicacao: "Solidificação é a passagem de líquido a sólido, como a água a congelar.",
      },
      {
        pergunta: "A que temperatura ferve a água pura, à pressão atmosférica normal?",
        opcoes: ["0 °C", "50 °C", "100 °C", "212 °C"],
        certa: 2,
        explicacao: "A água pura ferve a 100 °C e funde a 0 °C, à pressão atmosférica normal.",
      },
      {
        pergunta: "No gráfico temperatura-tempo do aquecimento de gelo puro, aparece um patamar a 0 °C. O que está a acontecer?",
        opcoes: ["O gelo está a arrefecer", "O gelo está a fundir e a temperatura mantém-se", "A água está a ferver", "O termómetro avariou"],
        certa: 1,
        explicacao: "Durante a fusão de uma substância pura, a temperatura mantém-se constante. É isso que forma o patamar no gráfico.",
      },
    ],
    seguintes: ["transformacoes", "densidade", "energia"],
    fonte: `${AE} · Materiais · Transformações Físicas e Químicas; Propriedades Físicas e Químicas dos Materiais`,
    revisto: false,
  },

  {
    id: "densidade",
    titulo: "Massa volúmica (densidade)",
    ano: 7,
    tema: "Materiais",
    subtema: "Propriedades Físicas e Químicas dos Materiais",
    palavras: ["densidade", "massa volumica", "flutua", "afunda", " boia "],
    explicacao: `A **massa volúmica** (muitas vezes chamada **densidade**) diz quanta massa há em cada unidade de volume de um material:

**massa volúmica = massa ÷ volume**

Mede-se, por exemplo, em g/cm³ ou kg/m³. A água tem uma massa volúmica de cerca de **1 g/cm³**.

• Um material com massa volúmica **menor** do que a da água **flutua** nela: o azeite (cerca de 0,92 g/cm³) ou a cortiça.
• Um material com massa volúmica **maior** **afunda**: uma pedra, um prego de ferro.

Cada substância pura tem a sua massa volúmica. Por isso, este valor também ajuda a identificar materiais e a saber se são puros.`,
    simples: `Imagina duas caixas do mesmo tamanho, uma cheia de penas e outra cheia de pedras. A das pedras tem muito mais massa: as pedras têm maior massa volúmica. O que tem massa volúmica menor do que a da água flutua; o que tem maior afunda.`,
    exemplo: `Um bloco tem 20 g de massa e 10 cm³ de volume. A massa volúmica é 20 g ÷ 10 cm³ = **2 g/cm³**. Como é maior do que a da água (1 g/cm³), o bloco afunda.`,
    verificacao: {
      pergunta: "Porque é que o azeite fica por cima da água num copo?",
      resposta: "Porque tem menor massa volúmica do que a água: cerca de 0,92 g/cm³, contra 1 g/cm³.",
    },
    treino: [
      {
        pergunta: "Um objeto tem 30 g de massa e 60 cm³ de volume. Qual é a sua massa volúmica?",
        opcoes: ["0,5 g/cm³", "2 g/cm³", "30 g/cm³", "90 g/cm³"],
        certa: 0,
        explicacao: "Massa volúmica = 30 g ÷ 60 cm³ = 0,5 g/cm³. Como é menor do que a da água, o objeto flutua.",
      },
      {
        pergunta: "Qual destes objetos flutua na água?",
        opcoes: ["Massa volúmica de 2,7 g/cm³", "Massa volúmica de 7,9 g/cm³", "Massa volúmica de 0,7 g/cm³", "Massa volúmica de 1,5 g/cm³"],
        certa: 2,
        explicacao: "Flutua o que tem massa volúmica menor do que a da água (1 g/cm³): só o de 0,7 g/cm³.",
      },
      {
        pergunta: "Se cortares uma barra de ferro ao meio, o que acontece à massa volúmica de cada metade?",
        opcoes: ["Fica para metade", "Fica igual", "Duplica", "Passa a ser zero"],
        certa: 1,
        explicacao: "A massa e o volume ficam ambos para metade, por isso a razão entre eles não muda. A massa volúmica é uma propriedade do material.",
      },
    ],
    seguintes: ["misturas", "mudancas", "materiais"],
    fonte: `${AE} · Materiais · Propriedades Físicas e Químicas dos Materiais`,
    revisto: false,
  },

  {
    id: "separacao",
    titulo: "Separar misturas",
    ano: 7,
    tema: "Materiais",
    subtema: "Separação das Substâncias de uma Mistura",
    palavras: ["separ", "decant", "filtr", "peneira", "destila", "cristaliza", "iman", "magnetic", " eta ", " etar ", "tratamento de agua", "aguas residuais", "salina"],
    explicacao: `Escolhe-se a técnica de separação conforme o tipo de mistura:

• **Peneiração**: sólidos com grãos de tamanhos diferentes.
• **Separação magnética**: um sólido atraído por um íman (limalha de ferro e areia).
• **Decantação**: líquidos imiscíveis (água e azeite) ou um sólido que assenta no fundo.
• **Filtração**: um sólido que não se dissolve num líquido (areia e água).
• **Evaporação** ou **cristalização**: recuperar um sólido dissolvido (o sal nas salinas).
• **Destilação**: separar um líquido de uma solução, aquecendo-a e voltando a arrefecer o vapor.

Estas técnicas são usadas nas **ETA**, que tratam a água que chega às nossas torneiras, e nas **ETAR**, que tratam as águas residuais antes de voltarem aos rios e ao mar.`,
    simples: `Para separar uma mistura, escolhes o "truque" certo: um íman para tirar o ferro, um filtro para tirar a areia da água, deixar a água evaporar para ficar com o sal. Cada mistura tem a sua técnica.`,
    exemplo: `Nas salinas, como as de Aveiro, a água do mar fica em tanques pouco fundos, ao sol. A água evapora e o sal fica para trás: é uma separação por evaporação.`,
    verificacao: {
      pergunta: "Como separarias areia misturada com água?",
      resposta: "Por filtração: a água passa pelo papel de filtro e a areia fica retida. Também podes esperar que a areia assente e decantar a água.",
    },
    treino: [
      {
        pergunta: "Que técnica usarias para separar limalha de ferro de areia?",
        opcoes: ["Filtração", "Separação magnética", "Destilação", "Decantação"],
        certa: 1,
        explicacao: "O ferro é atraído pelo íman e a areia não.",
      },
      {
        pergunta: "Como se obtém sal a partir de água salgada?",
        opcoes: ["Por filtração", "Por peneiração", "Por evaporação", "Por separação magnética"],
        certa: 2,
        explicacao: "O sal está dissolvido, por isso o filtro não o retém. Quando a água evapora, o sal fica.",
      },
      {
        pergunta: "O que faz uma ETA?",
        opcoes: ["Trata a água para consumo", "Produz eletricidade", "Trata o lixo", "Recicla plástico"],
        certa: 0,
        explicacao: "ETA é uma Estação de Tratamento de Água. A ETAR é a Estação de Tratamento de Águas Residuais.",
      },
    ],
    seguintes: ["misturas", "mudancas", "materiais"],
    fonte: `${AE} · Materiais · Separação das Substâncias de uma Mistura`,
    revisto: false,
  },

  {
    id: "energia",
    titulo: "Fontes e transferências de energia",
    ano: 7,
    tema: "Energia",
    subtema: "Fontes de Energia e Transferências de Energia",
    palavras: ["energia", "renovav", "fonte de energia", "fontes de energia", "energia solar", "painel solar", "paineis solares", "eolica", "calor", "temperatura", "conducao", "conveccao", "radiacao", "equilibrio termico", "joule"],
    explicacao: `Há sistemas que são **fontes** de energia (cedem energia) e outros que são **recetores** (recebem). Mede-se em **joules (J)** e, no total, **mantém-se**: não se cria nem se destrói.

A energia transfere-se como calor de três formas:

• **Condução**: por contacto, sobretudo nos sólidos (uma colher numa sopa quente).
• **Convecção**: pelo movimento de líquidos e gases (a água numa panela ao lume).
• **Radiação**: sem precisar de matéria (a energia do Sol).

**Temperatura** e **calor** não são a mesma coisa: a temperatura indica quão quente está um corpo; o calor é a energia que passa do corpo mais quente para o mais frio.

As fontes podem ser **renováveis** (Sol, vento, água) ou **não renováveis** (petróleo, carvão, gás natural).`,
    simples: `A energia passa de umas coisas para outras: o Sol aquece a Terra, o fogão aquece a panela. O calor anda sempre do mais quente para o mais frio. Há fontes de energia que não acabam (Sol, vento) e outras que um dia acabam (petróleo, carvão).`,
    exemplo: `Quando seguras numa caneca de chocolate quente, as tuas mãos aquecem por condução. Ao mesmo tempo, o chocolate vai arrefecendo, porque cede energia às tuas mãos e ao ar, até tudo ficar à mesma temperatura: o **equilíbrio térmico**.`,
    verificacao: {
      pergunta: "Porque é que o cabo de uma colher de metal aquece quando a deixas na sopa quente?",
      resposta: "Por condução: a energia passa, por contacto, da sopa para a colher e ao longo do metal até ao cabo.",
    },
    treino: [
      {
        pergunta: "Como chega à Terra a energia do Sol?",
        opcoes: ["Por condução", "Por convecção", "Por radiação", "Por evaporação"],
        certa: 2,
        explicacao: "Entre o Sol e a Terra não há matéria suficiente para condução ou convecção. A energia chega por radiação.",
      },
      {
        pergunta: "Qual destas fontes de energia é renovável?",
        opcoes: ["Petróleo", "Carvão", "Vento", "Gás natural"],
        certa: 2,
        explicacao: "O vento não se esgota. O petróleo, o carvão e o gás natural levaram milhões de anos a formar-se e um dia acabam.",
      },
      {
        pergunta: "Qual é a diferença entre calor e temperatura?",
        opcoes: ["São a mesma coisa", "A temperatura indica quão quente está um corpo; o calor é energia transferida", "O calor mede-se com um termómetro", "A temperatura passa do corpo quente para o frio"],
        certa: 1,
        explicacao: "O termómetro mede a temperatura. O calor é a energia que passa do corpo mais quente para o mais frio.",
      },
    ],
    seguintes: ["mudancas", "transformacoes", "eletricidade"],
    fonte: `${AE} · Energia · Fontes de Energia e Transferências de Energia`,
    revisto: false,
  },
];
