// Conteúdos do 8.º ano (etapa 2b do PRD).
// Organizados pelos subtemas das Aprendizagens Essenciais de Físico-Química, 8.º ano (DGE, março de 2026).
// O modelo de cada tema está descrito em ano7.js.

const AE = "Aprendizagens Essenciais de Físico-Química, 8.º ano (DGE, março de 2026)";

export const TEMAS_8 = [
  {
    id: "estados",
    titulo: "Estados físicos e corpúsculos",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Explicação e representação de reações químicas",
    palavras: ["estado fisico", "estados fisicos", "solido", "liquido", "gasoso", " gas ", " gases ", "particula", "corpusc", "pressao", "agitacao"],
    explicacao: `Toda a matéria é formada por partículas muito pequenas, os **corpúsculos**, que estão sempre em movimento. É a **natureza corpuscular da matéria**.

A diferença entre os estados físicos está na proximidade e na liberdade de movimento dos corpúsculos:

• **Sólido**: muito próximos, só vibram no lugar. Forma e volume próprios.
• **Líquido**: próximos, mas deslizam uns sobre os outros. Volume próprio; toma a forma do recipiente.
• **Gasoso**: muito afastados e com grande liberdade de movimento. Ocupa todo o espaço disponível.

Num gás, a **temperatura**, o **volume** e a **pressão** estão relacionados. Se aquecermos um gás num recipiente fechado, os corpúsculos movem-se mais depressa, chocam mais com as paredes e a pressão aumenta.`,
    simples: `Tudo é feito de partículas minúsculas sempre a mexer-se. Num sólido estão muito juntas e quase paradas; num líquido estão juntas mas escorregam; num gás estão muito afastadas e andam por todo o lado.`,
    exemplo: `Uma bola de futebol deixada ao sol fica mais dura. O ar lá dentro aquece, as partículas movem-se mais depressa e batem com mais força nas paredes da bola: a pressão aumenta.`,
    verificacao: {
      pergunta: "Porque é que um gás ocupa todo o espaço do recipiente e um sólido não?",
      resposta: "Porque, num gás, os corpúsculos estão muito afastados e movem-se livremente em todas as direções. Num sólido, estão muito próximos e só vibram no lugar.",
    },
    treino: [
      {
        pergunta: "Em que estado físico os corpúsculos estão mais afastados?",
        opcoes: ["Sólido", "Líquido", "Gasoso", "É igual nos três"],
        certa: 2,
        explicacao: "No estado gasoso os corpúsculos estão muito afastados e têm grande liberdade de movimento.",
      },
      {
        pergunta: "Aqueces um gás num recipiente fechado. O que acontece à pressão?",
        opcoes: ["Diminui", "Aumenta", "Fica igual", "Passa a zero"],
        certa: 1,
        explicacao: "Os corpúsculos movem-se mais depressa e chocam mais vezes e com mais força com as paredes: a pressão aumenta.",
      },
      {
        pergunta: "Porque é que um líquido toma a forma do recipiente?",
        opcoes: ["Porque os corpúsculos estão parados", "Porque os corpúsculos deslizam uns sobre os outros", "Porque os corpúsculos estão muito afastados", "Porque não tem corpúsculos"],
        certa: 1,
        explicacao: "No líquido os corpúsculos estão próximos, mas podem deslizar uns sobre os outros. Por isso o líquido adapta-se ao recipiente.",
      },
    ],
    seguintes: ["atomos", "mudancas", "reacoes"],
    fonte: `${AE} · Reações Químicas · Explicação e representação de reações químicas`,
    revisto: false,
  },

  {
    id: "atomos",
    titulo: "Átomos, moléculas e iões",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Explicação e representação de reações químicas",
    palavras: ["atomo", "molecula", "eletrao", "eletroes", "protao", "protoes", "neutrao", "neutroes", "nucleo", " iao ", " ioes ", "aniao", "aniaes", "catiao", "catioes", "formula quimica", "formulas quimicas", "simbolo quimico", "elemento quimico", "composto ionico"],
    explicacao: `Os **átomos** têm um **núcleo** com **protões** (carga positiva) e **neutrões** (sem carga), e **eletrões** (carga negativa) à sua volta. Têm tantos protões como eletrões, por isso são **eletricamente neutros**.

Átomos com o mesmo número de protões são do mesmo **elemento químico**, representado por um **símbolo químico**: H (hidrogénio), O (oxigénio), Na (sódio).

• Uma **molécula** é um grupo de átomos ligados: H₂O, O₂, CO₂.
• Um **ião** é um átomo ou grupo de átomos que perdeu eletrões (**catião**, positivo, como Na⁺) ou ganhou eletrões (**anião**, negativo, como Cl⁻).

A **fórmula química** diz que elementos formam a substância e em que proporção: H₂O tem 2 átomos de hidrogénio e 1 de oxigénio. O sal de cozinha é o cloreto de sódio, NaCl.`,
    simples: `Tudo é feito de átomos, peças tão pequenas que não se veem. Os átomos juntam-se como peças de LEGO e formam moléculas: a água é feita de 2 átomos de hidrogénio e 1 de oxigénio, H₂O. Quando um átomo ganha ou perde eletrões, fica com carga e chama-se ião.`,
    exemplo: `Lê o rótulo de uma garrafa de água mineral. Vais encontrar iões como Ca²⁺ (cálcio), Mg²⁺ (magnésio), Na⁺ (sódio) e Cl⁻ (cloreto). Estão dissolvidos na água e é por isso que cada marca tem um sabor ligeiramente diferente.`,
    verificacao: {
      pergunta: "Quantos átomos tem uma molécula de dióxido de carbono, CO₂?",
      resposta: "Tem 3 átomos: 1 de carbono e 2 de oxigénio.",
    },
    treino: [
      {
        pergunta: "Que partículas existem no núcleo de um átomo?",
        opcoes: ["Só eletrões", "Protões e neutrões", "Eletrões e protões", "Iões"],
        certa: 1,
        explicacao: "O núcleo tem protões e neutrões. Os eletrões estão à volta do núcleo.",
      },
      {
        pergunta: "Um átomo que perdeu eletrões é…",
        opcoes: ["um anião, com carga negativa", "um catião, com carga positiva", "uma molécula", "um átomo neutro"],
        certa: 1,
        explicacao: "Ao perder eletrões (negativos), fica com mais protões do que eletrões: carga positiva. É um catião, como o Na⁺.",
      },
      {
        pergunta: "Na fórmula H₂O, o que indica o número 2?",
        opcoes: ["Que há 2 moléculas de água", "Que há 2 átomos de hidrogénio em cada molécula", "Que há 2 átomos de oxigénio", "A carga da molécula"],
        certa: 1,
        explicacao: "O índice 2 refere-se ao hidrogénio: cada molécula de água tem 2 átomos de hidrogénio e 1 de oxigénio.",
      },
    ],
    seguintes: ["estados", "reacoes", "tabela"],
    fonte: `${AE} · Reações Químicas · Explicação e representação de reações químicas`,
    revisto: false,
  },

  {
    id: "reacoes",
    titulo: "Reações químicas e Lei de Lavoisier",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Explicação e representação de reações químicas",
    palavras: ["reacao quimica", "reacoes quimicas", "lavoisier", "conservacao da massa", "equacao quimica", "equacoes quimicas", "acertar", "reagente", "produtos da reacao"],
    explicacao: `Numa **reação química**, os átomos dos **reagentes** separam-se e voltam a juntar-se de outra forma, dando origem a substâncias novas, os **produtos da reação**. Os átomos não se criam nem desaparecem: só mudam de "parceiros".

Por isso, a **massa total mantém-se**. É a **Lei da Conservação da Massa**, ou **Lei de Lavoisier**: a massa dos reagentes que se gasta é igual à massa dos produtos que se forma.

Representamos as reações com **equações químicas**, que têm de estar **acertadas**: o número de átomos de cada elemento é igual dos dois lados.

**2 H₂ + O₂ → 2 H₂O**

Os números à frente das fórmulas (os **coeficientes**) indicam quantas moléculas reagem ou se formam.`,
    simples: `Numa reação química, os átomos trocam de lugar como peças de LEGO que se desmontam e voltam a montar noutra forma. Como não aparecem nem desaparecem peças, a massa total no fim é igual à do início.`,
    exemplo: `Se queimares um fósforo dentro de um frasco bem fechado em cima de uma balança, a massa total não muda. Os gases que se formam ficam presos no frasco. Ao ar livre, parece que a massa "desaparece", mas os gases simplesmente foram para o ar.`,
    verificacao: {
      pergunta: "Numa reação, 10 g de reagentes transformaram-se completamente em produtos. Qual é a massa dos produtos?",
      resposta: "10 g. Pela Lei de Lavoisier, a massa total conserva-se.",
    },
    treino: [
      {
        pergunta: "O que diz a Lei de Lavoisier?",
        opcoes: ["Numa reação química, a massa total conserva-se", "Numa reação química, a massa total aumenta", "Os átomos destroem-se nas reações", "Só há reações com calor"],
        certa: 0,
        explicacao: "Os átomos só se rearranjam, por isso a massa total dos reagentes é igual à dos produtos.",
      },
      {
        pergunta: "Na equação 2 H₂ + O₂ → 2 H₂O, quantos átomos de hidrogénio há do lado dos reagentes?",
        opcoes: ["2", "4", "1", "6"],
        certa: 1,
        explicacao: "2 moléculas de H₂ têm 2 × 2 = 4 átomos de hidrogénio. Do lado dos produtos, 2 H₂O também têm 4.",
      },
      {
        pergunta: "O que acontece aos átomos numa reação química?",
        opcoes: ["Desaparecem", "Transformam-se noutros elementos", "Rearranjam-se e formam substâncias novas", "Ficam exatamente iguais e ligados da mesma forma"],
        certa: 2,
        explicacao: "Os átomos mantêm-se, mas ligam-se de outra forma, formando os produtos da reação.",
      },
    ],
    seguintes: ["combustao", "velocidade", "transformacoes"],
    fonte: `${AE} · Reações Químicas · Explicação e representação de reações químicas`,
    revisto: false,
  },

  {
    id: "combustao",
    titulo: "Combustões",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Tipos de reações químicas",
    palavras: ["combust", "comburente", " fogo ", " chama ", "efeito de estufa", "alteracoes climaticas", "monoxido de carbono", "poluicao do ar", "poluicao atmosferica"],
    explicacao: `Uma **combustão** é uma reação química entre um **combustível** (o que arde: madeira, gás, gasolina) e um **comburente**, normalmente o **oxigénio** do ar. Liberta energia sob a forma de calor e de luz.

Para haver fogo são precisos três ingredientes, o **triângulo do fogo**: combustível, comburente e uma fonte de calor que inicie a reação. Tira um deles e o fogo apaga-se.

Exemplo, a combustão do metano (o gás do fogão):

**metano + oxigénio → dióxido de carbono + água**

As combustões de combustíveis fósseis libertam **dióxido de carbono**, que aumenta o **efeito de estufa** e contribui para as **alterações climáticas**, e outros poluentes. Quando há pouco oxigénio, forma-se **monóxido de carbono**, um gás muito tóxico e sem cheiro.`,
    simples: `Uma combustão é uma "queima": um combustível reage com o oxigénio do ar e liberta calor e luz. Para haver fogo é preciso combustível, oxigénio e calor. Queimar gasolina, gás ou carvão liberta gases que poluem e aquecem o planeta.`,
    exemplo: `Quando tapas uma vela acesa com um copo, a chama apaga-se ao fim de pouco tempo. O oxigénio dentro do copo acaba, e sem comburente não há combustão.`,
    verificacao: {
      pergunta: "Porque é que se usa uma manta para apagar um fogo pequeno na cozinha?",
      resposta: "Porque a manta impede o oxigénio (o comburente) de chegar ao combustível, e sem comburente a combustão para.",
    },
    treino: [
      {
        pergunta: "Numa combustão, qual é normalmente o comburente?",
        opcoes: ["A madeira", "O oxigénio", "O dióxido de carbono", "A água"],
        certa: 1,
        explicacao: "O comburente é a substância que reage com o combustível. Normalmente é o oxigénio do ar.",
      },
      {
        pergunta: "Qual destes NÃO faz parte do triângulo do fogo?",
        opcoes: ["Combustível", "Comburente", "Fonte de calor", "Água"],
        certa: 3,
        explicacao: "O triângulo do fogo é combustível, comburente e calor. A água serve para apagar fogos, porque os arrefece.",
      },
      {
        pergunta: "Que gás das combustões contribui mais para o efeito de estufa?",
        opcoes: ["Oxigénio", "Azoto", "Dióxido de carbono", "Hélio"],
        certa: 2,
        explicacao: "O dióxido de carbono libertado na queima de combustíveis fósseis aumenta o efeito de estufa.",
      },
    ],
    seguintes: ["reacoes", "acidos", "energia"],
    fonte: `${AE} · Reações Químicas · Tipos de reações químicas`,
    revisto: false,
  },

  {
    id: "acidos",
    titulo: "Ácidos, bases e pH",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Tipos de reações químicas",
    palavras: ["acido", "acida", " base ", " bases ", "basica", "basico", "alcalin", "neutra", "neutraliz", " ph ", "escala de ph", "indicador", "tornesol", "fenolftaleina"],
    explicacao: `As soluções aquosas podem ser **ácidas**, **neutras** ou **básicas** (alcalinas). Medimos isso com a **escala de pH**, de 0 a 14, a 25 °C:

• **pH menor do que 7**: ácida (sumo de limão, vinagre).
• **pH igual a 7**: neutra (água pura).
• **pH maior do que 7**: básica (água com sabão, lixívia).

Para saber o caráter de uma solução usamos **indicadores**, que mudam de cor. A **fenolftaleína** fica carmim nas soluções básicas e incolor nas ácidas e neutras. O **tornesol** fica vermelho nas ácidas e azul nas básicas. O **indicador universal** e o **medidor de pH** dão o valor do pH.

Juntar uma solução ácida a uma básica faz o pH aproximar-se de 7: é uma **neutralização**.`,
    simples: `O pH diz se uma coisa é ácida ou básica. Abaixo de 7 é ácida, como o limão. Acima de 7 é básica, como o sabão. Exatamente 7 é neutra, como a água pura. Os indicadores mudam de cor para nos mostrar o que é.`,
    exemplo: `A couve-roxa é um indicador natural! A água onde se coze fica roxa, mas fica cor-de-rosa com vinagre (ácido) e esverdeada com bicarbonato de sódio (básico).`,
    verificacao: {
      pergunta: "Uma solução tem pH 3. É ácida, neutra ou básica?",
      resposta: "É ácida, porque o pH é menor do que 7.",
    },
    treino: [
      {
        pergunta: "Qual destas soluções é básica?",
        opcoes: ["pH 2", "pH 5", "pH 7", "pH 11"],
        certa: 3,
        explicacao: "As soluções básicas têm pH maior do que 7.",
      },
      {
        pergunta: "Que cor tem a fenolftaleína numa solução básica?",
        opcoes: ["Incolor", "Carmim", "Azul", "Amarela"],
        certa: 1,
        explicacao: "A fenolftaleína fica carmim nas soluções básicas e incolor nas ácidas e neutras.",
      },
      {
        pergunta: "Juntas uma solução básica a uma solução ácida. O que acontece ao pH da solução ácida?",
        opcoes: ["Diminui", "Aumenta, aproximando-se de 7", "Fica igual", "Passa a 0"],
        certa: 1,
        explicacao: "A base neutraliza o ácido, por isso o pH sobe e aproxima-se de 7.",
      },
    ],
    seguintes: ["precipitacao", "combustao", "reacoes"],
    fonte: `${AE} · Reações Químicas · Tipos de reações químicas`,
    revisto: false,
  },

  {
    id: "precipitacao",
    titulo: "Precipitação e dureza da água",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Tipos de reações químicas",
    palavras: ["precipita", "pouco soluve", "muito soluve", "soluvel", "soluveis", "estalactite", "estalagmite", "dureza da agua", "agua dura", "aguas duras", "calcario"],
    explicacao: `Há sais **muito solúveis** em água (como o sal de cozinha) e sais **pouco solúveis** (como o calcário).

Numa **reação de precipitação**, juntam-se duas soluções e forma-se um sal pouco solúvel, que aparece como um sólido: o **precipitado**. Por exemplo:

**nitrato de prata + cloreto de sódio → cloreto de prata + nitrato de sódio**

O cloreto de prata é o precipitado branco.

Estas reações acontecem na natureza: as **estalactites** e **estalagmites** das grutas, as **conchas** e os **corais** formam-se por precipitação de carbonato de cálcio.

A água com muitos iões de cálcio e de magnésio chama-se **água dura**. Deixa calcário nas chaleiras e máquinas e faz menos espuma com o sabão.`,
    simples: `Às vezes, ao juntar dois líquidos transparentes, aparece um sólido: é um precipitado. O calcário que fica na chaleira é parecido: a água de algumas zonas tem muitos sais, e quando aquece eles ficam agarrados ao fundo.`,
    exemplo: `Nas zonas de água dura, as torneiras e os chuveiros ficam com manchas brancas de calcário. O vinagre ajuda a limpá-las, porque reage com o calcário e dissolve-o.`,
    verificacao: {
      pergunta: "Como sabes que houve uma reação de precipitação quando juntas duas soluções?",
      resposta: "Porque aparece um sólido, o precipitado, que torna a mistura turva ou se deposita no fundo.",
    },
    treino: [
      {
        pergunta: "O que é um precipitado?",
        opcoes: ["Um gás que se liberta", "Um sólido pouco solúvel que se forma numa reação", "Um líquido muito quente", "Uma solução muito concentrada"],
        certa: 1,
        explicacao: "O precipitado é o sal pouco solúvel que se forma e aparece como sólido.",
      },
      {
        pergunta: "Como se formam as estalactites?",
        opcoes: ["Por combustão", "Por precipitação de carbonato de cálcio", "Por evaporação de sal", "Por neutralização"],
        certa: 1,
        explicacao: "A água que escorre nas grutas tem carbonato de cálcio dissolvido, que precipita aos poucos.",
      },
      {
        pergunta: "O que caracteriza uma água dura?",
        opcoes: ["Ter muitos iões de cálcio e magnésio", "Estar congelada", "Ser muito ácida", "Não ter sais nenhuns"],
        certa: 0,
        explicacao: "A água dura tem muitos iões de cálcio e de magnésio, que formam calcário.",
      },
    ],
    seguintes: ["acidos", "misturas", "velocidade"],
    fonte: `${AE} · Reações Químicas · Tipos de reações químicas`,
    revisto: false,
  },

  {
    id: "velocidade",
    titulo: "Velocidade das reações",
    ano: 8,
    tema: "Reações Químicas",
    subtema: "Velocidade das reações químicas",
    palavras: ["velocidade das reac", "velocidade de uma reac", "velocidade da reac", "rapidez da reac", "rapidez das reac", "catalisador", "estado de divisao", "reacao mais rapida", "reacoes mais rapidas"],
    explicacao: `A **velocidade de uma reação química** é a rapidez com que um reagente desaparece ou um produto aparece. Há reações muito rápidas (uma explosão) e muito lentas (o ferro a enferrujar).

Quatro fatores podem tornar uma reação mais rápida:

• **Concentração dos reagentes** maior.
• **Temperatura** mais alta.
• **Estado de divisão** maior: um sólido em pó reage mais depressa do que em pedaços, porque tem mais superfície em contacto.
• Presença de um **catalisador**: uma substância que acelera a reação sem se gastar.

É por isso que guardamos os alimentos no frigorífico: a temperatura baixa torna mais lentas as reações que os estragam.`,
    simples: `Algumas reações são rápidas, outras lentas. Ficam mais rápidas com mais calor, com reagentes mais concentrados, com pedaços mais pequenos ou com uma ajuda chamada catalisador.`,
    exemplo: `Um comprimido efervescente inteiro demora a dissolver-se na água. Se o esmagares primeiro, a reação é muito mais rápida: o pó tem muito mais superfície em contacto com a água.`,
    verificacao: {
      pergunta: "Porque é que o leite se estraga mais depressa fora do frigorífico?",
      resposta: "Porque a temperatura é mais alta, e as reações que estragam o leite ficam mais rápidas.",
    },
    treino: [
      {
        pergunta: "Qual destas mudanças torna uma reação mais rápida?",
        opcoes: ["Baixar a temperatura", "Usar o reagente sólido em pó", "Diluir os reagentes", "Usar pedaços maiores"],
        certa: 1,
        explicacao: "Em pó, o sólido tem mais superfície em contacto com os outros reagentes, por isso reage mais depressa.",
      },
      {
        pergunta: "O que é um catalisador?",
        opcoes: ["Um reagente que se gasta todo", "Uma substância que acelera a reação sem se gastar", "Um produto da reação", "Uma substância que impede todas as reações"],
        certa: 1,
        explicacao: "O catalisador acelera a reação e, no fim, continua lá, sem se ter gastado.",
      },
      {
        pergunta: "Porque se guardam os alimentos no frigorífico?",
        opcoes: ["Para aumentar a concentração", "Porque a temperatura baixa torna mais lentas as reações que os estragam", "Para os aquecer", "Para mudar o estado de divisão"],
        certa: 1,
        explicacao: "A temperatura baixa torna mais lentas as reações químicas que estragam os alimentos.",
      },
    ],
    seguintes: ["reacoes", "combustao", "precipitacao"],
    fonte: `${AE} · Reações Químicas · Velocidade das reações químicas`,
    revisto: false,
  },

  {
    id: "som",
    titulo: "Som e ondas",
    ano: 8,
    tema: "Som",
    subtema: "Produção e propagação do som e ondas",
    palavras: [" som ", " sons ", "sonora", "sonoro", "vibra", "onda sonora", "ondas sonoras", "o que e uma onda", "amplitude", "frequencia", "periodo de uma onda", "periodo da onda", "velocidade do som", "propagacao do som"],
    explicacao: `O som é produzido por uma **fonte sonora** que **vibra**: as cordas de uma guitarra, as nossas cordas vocais.

O som é uma **onda de pressão**: a vibração passa de partícula em partícula através de um **meio material**. Por isso **não se propaga no vazio**. É mais rápido nos sólidos, depois nos líquidos, e mais lento nos gases: cerca de 340 m/s no ar e 1500 m/s na água.

Uma onda é a propagação de uma vibração. Descreve-se com:

• **Amplitude**: o "tamanho" da vibração.
• **Período (T)**: o tempo de uma vibração completa, em segundos.
• **Frequência (f)**: quantas vibrações há por segundo, em hertz (Hz). **f = 1 ÷ T**.`,
    simples: `O som nasce quando alguma coisa vibra. Essa vibração passa pelo ar (ou pela água, ou por uma parede) até chegar aos nossos ouvidos. No espaço, onde não há ar, não se ouve nada.`,
    exemplo: `Encosta o ouvido a uma mesa e pede a alguém para bater levemente na outra ponta. Ouves o som mais cedo e mais forte do que pelo ar, porque o som propaga-se melhor nos sólidos.`,
    verificacao: {
      pergunta: "Porque é que não se ouvem explosões no espaço?",
      resposta: "Porque o som precisa de um meio material para se propagar, e no espaço há praticamente vazio.",
    },
    treino: [
      {
        pergunta: "Onde é que o som se propaga mais depressa?",
        opcoes: ["No ar", "Na água", "Num sólido, como o aço", "No vazio"],
        certa: 2,
        explicacao: "O som é mais rápido nos sólidos, depois nos líquidos e mais lento nos gases. No vazio não se propaga.",
      },
      {
        pergunta: "Uma onda tem um período de 0,5 s. Qual é a sua frequência?",
        opcoes: ["0,5 Hz", "2 Hz", "5 Hz", "50 Hz"],
        certa: 1,
        explicacao: "f = 1 ÷ T = 1 ÷ 0,5 s = 2 Hz.",
      },
      {
        pergunta: "O som é uma onda…",
        opcoes: ["eletromagnética, que se propaga no vazio", "de pressão, que precisa de um meio material", "de luz", "que só existe nos líquidos"],
        certa: 1,
        explicacao: "O som é uma onda de pressão e precisa de um meio material (sólido, líquido ou gás).",
      },
    ],
    seguintes: ["atributos-som", "luz", "estados"],
    fonte: `${AE} · Som · Produção e propagação do som e ondas`,
    revisto: false,
  },

  {
    id: "atributos-som",
    titulo: "Atributos do som e audição",
    ano: 8,
    tema: "Som",
    subtema: "Atributos do som e sua deteção pelo ser humano e fenómenos acústicos",
    palavras: ["altura do som", "intensidade do som", "timbre", "agudo", " grave ", "decibel", "decibeis", " db ", " eco ", "reverbera", "ultrassom", "ultrassons", "infrassom", "sonar", "ecografia", "poluicao sonora", "ruido", "audicao", "ouvir", "surdez", "audiograma"],
    explicacao: `Um som distingue-se de outro por três **atributos**:

• **Intensidade** (forte ou fraco): depende da **amplitude** da onda. Mede-se o nível de intensidade em **decibéis (dB)**.
• **Altura** (agudo ou grave): depende da **frequência**. Frequência alta, som agudo.
• **Timbre**: depende da forma da onda. Permite distinguir uma guitarra de um piano a tocar a mesma nota.

O ouvido humano ouve frequências entre cerca de **20 Hz e 20 000 Hz**. Abaixo são **infrassons**; acima, **ultrassons**, que os morcegos e os golfinhos usam e que servem para as ecografias.

Quando o som se reflete num obstáculo, ouvimos o **eco**. Sons muito intensos, a partir de cerca de 120 dB (o **limiar da dor**), magoam e podem causar surdez.`,
    simples: `Os sons podem ser fortes ou fracos, agudos ou graves, e cada instrumento tem a sua "voz", o timbre. Há sons que os humanos não ouvem, como os ultrassons dos morcegos. Sons muito altos estragam os ouvidos.`,
    exemplo: `Ouvir música com auscultadores no volume máximo pode passar dos 100 dB. Usar o volume a menos de metade e fazer pausas protege a tua audição para o resto da vida.`,
    verificacao: {
      pergunta: "Duas notas têm a mesma intensidade, mas uma é mais aguda. O que é diferente nas ondas?",
      resposta: "A frequência: o som mais agudo tem frequência maior.",
    },
    treino: [
      {
        pergunta: "De que depende a altura de um som (agudo ou grave)?",
        opcoes: ["Da amplitude", "Da frequência", "Do timbre", "Da velocidade do som"],
        certa: 1,
        explicacao: "Quanto maior a frequência, mais agudo é o som.",
      },
      {
        pergunta: "O que são ultrassons?",
        opcoes: ["Sons muito fortes", "Sons com frequência acima de 20 000 Hz", "Sons muito graves", "Sons que só se ouvem na água"],
        certa: 1,
        explicacao: "Os ultrassons têm frequências acima do que o ouvido humano consegue ouvir (cerca de 20 000 Hz).",
      },
      {
        pergunta: "O que permite distinguir uma guitarra de um piano a tocar a mesma nota com a mesma intensidade?",
        opcoes: ["A altura", "A intensidade", "O timbre", "A velocidade"],
        certa: 2,
        explicacao: "O timbre depende da forma da onda e é diferente em cada instrumento.",
      },
    ],
    seguintes: ["som", "luz", "fenomenos-oticos"],
    fonte: `${AE} · Som · Atributos do som e sua deteção pelo ser humano e fenómenos acústicos`,
    revisto: false,
  },

  {
    id: "luz",
    titulo: "Luz e espectro eletromagnético",
    ano: 8,
    tema: "Luz",
    subtema: "Ondas de luz e sua propagação",
    palavras: [" luz ", "luminoso", "luminosos", "iluminado", "iluminados", "corpo luminoso", "corpos luminosos", "corpo iluminado", "corpos iluminados", "raio de luz", "raios de luz", "velocidade da luz", "espectro", "eletromagnetic", "infravermelh", "ultravioleta", "raios x", "micro-ondas", "ondas de radio"],
    explicacao: `Há **corpos luminosos**, que produzem luz (o Sol, uma lâmpada acesa), e **corpos iluminados**, que só refletem a luz que recebem (a Lua, este ecrã desligado).

A luz transporta energia e é uma **onda eletromagnética**: ao contrário do som, **não precisa de um meio material** e propaga-se no vazio. Propaga-se em **linha reta**, representada por **raios de luz**, e tem a velocidade máxima no vácuo: cerca de **300 000 km/s**.

A luz visível é só uma parte do **espectro eletromagnético**. Por ordem crescente de frequência:

**ondas de rádio, micro-ondas, infravermelho, luz visível, ultravioleta, raios X, raios gama**

Cada região tem aplicações: o rádio, o micro-ondas, os comandos da televisão (infravermelho), as radiografias (raios X).`,
    simples: `Há coisas que dão luz, como o Sol, e coisas que só a refletem, como a Lua. A luz anda em linha reta, é a coisa mais rápida que existe e, ao contrário do som, consegue atravessar o espaço vazio.`,
    exemplo: `A luz do Sol demora cerca de 8 minutos a chegar à Terra. Já a luz refletida pela Lua chega-nos em pouco mais de 1 segundo. A Lua não brilha sozinha: é um corpo iluminado.`,
    verificacao: {
      pergunta: "A Lua é um corpo luminoso ou iluminado?",
      resposta: "É iluminado: não produz luz, só reflete a luz do Sol.",
    },
    treino: [
      {
        pergunta: "Qual destes é um corpo luminoso?",
        opcoes: ["A Lua", "Um espelho", "O Sol", "Um livro"],
        certa: 2,
        explicacao: "O Sol produz luz. A Lua, o espelho e o livro só refletem a luz que recebem.",
      },
      {
        pergunta: "Onde é que a luz se propaga mais depressa?",
        opcoes: ["No vidro", "Na água", "No vácuo", "No ar e no vidro é igual"],
        certa: 2,
        explicacao: "A velocidade da luz é máxima no vácuo, cerca de 300 000 km/s.",
      },
      {
        pergunta: "Qual destas radiações tem maior frequência?",
        opcoes: ["Ondas de rádio", "Infravermelho", "Luz visível", "Raios X"],
        certa: 3,
        explicacao: "Por ordem crescente de frequência: rádio, micro-ondas, infravermelho, visível, ultravioleta, raios X, raios gama.",
      },
    ],
    seguintes: ["fenomenos-oticos", "som", "universo"],
    fonte: `${AE} · Luz · Ondas de luz e sua propagação`,
    revisto: false,
  },

  {
    id: "fenomenos-oticos",
    titulo: "Reflexão, refração e lentes",
    ano: 8,
    tema: "Luz",
    subtema: "Fenómenos óticos",
    palavras: ["reflex", "refrac", "espelho", "lente", " lupa ", "miopia", "hipermetropia", "palhinha", "arco-iris", "arco iris", "prisma", "dispers", "absorcao da luz", "cores da luz", "olho humano"],
    explicacao: `Quando a luz chega a uma superfície, pode ser:

• **Refletida**: volta para trás. A reflexão é **especular** em superfícies polidas (um espelho) e **difusa** em superfícies rugosas. O ângulo de incidência é igual ao ângulo de reflexão.
• **Refratada**: muda de direção ao passar para outro meio, porque muda de velocidade. É por isso que uma palhinha parece partida num copo de água.
• **Absorvida**: fica no material e aquece-o.

As **lentes convergentes** juntam os raios de luz (lupa) e corrigem a **hipermetropia**; as **divergentes** afastam-nos e corrigem a **miopia**.

A luz branca é uma mistura de cores. Num prisma, cada cor refrata-se de forma diferente e as cores separam-se: é a **dispersão**, a mesma que forma o **arco-íris**.`,
    simples: `A luz pode bater numa superfície e voltar (reflexão, como no espelho), mudar de direção ao entrar noutro material (refração, como a palhinha "partida" no copo) ou ficar no material e aquecê-lo (absorção).`,
    exemplo: `O arco-íris aparece quando o Sol está atrás de ti e há gotas de chuva à tua frente. Cada gota funciona como um pequeno prisma: separa a luz branca nas várias cores.`,
    verificacao: {
      pergunta: "Que tipo de lente usa uma pessoa com miopia?",
      resposta: "Uma lente divergente.",
    },
    treino: [
      {
        pergunta: "Porque é que uma palhinha parece partida dentro de um copo com água?",
        opcoes: ["Por reflexão", "Por refração", "Por absorção", "Porque a palhinha dobra"],
        certa: 1,
        explicacao: "A luz muda de direção ao passar da água para o ar, porque muda de velocidade. Isso é a refração.",
      },
      {
        pergunta: "Na reflexão da luz, o ângulo de reflexão é…",
        opcoes: ["sempre 90°", "igual ao ângulo de incidência", "o dobro do ângulo de incidência", "sempre zero"],
        certa: 1,
        explicacao: "É uma das leis da reflexão: o ângulo de reflexão é igual ao ângulo de incidência.",
      },
      {
        pergunta: "Que fenómeno explica o arco-íris?",
        opcoes: ["A reflexão especular", "A dispersão da luz", "A absorção da luz", "A propagação do som"],
        certa: 1,
        explicacao: "Nas gotas de chuva, as cores da luz branca refratam-se de forma diferente e separam-se: é a dispersão.",
      },
    ],
    seguintes: ["luz", "atributos-som", "som"],
    fonte: `${AE} · Luz · Fenómenos óticos`,
    revisto: false,
  },
];
