// Conteúdos do 9.º ano (etapa 2c do PRD).
// Organizados pelos subtemas das Aprendizagens Essenciais de Físico-Química, 9.º ano (DGE, março de 2026).
// O modelo de cada tema está descrito em ano7.js.

const AE = "Aprendizagens Essenciais de Físico-Química, 9.º ano (DGE, março de 2026)";

export const TEMAS_9 = [
  {
    id: "movimentos",
    titulo: "Movimentos e gráficos",
    ano: 9,
    tema: "Movimentos e Forças",
    subtema: "Movimentos na Terra",
    palavras: ["movimento", "referencial", "repouso", "trajetoria", "rapidez", "distancia percorrida", "velocidade media", "posicao-tempo", "velocidade-tempo", "grafico posicao", "grafico velocidade", "grafico de posicao", "grafico de velocidade", "aceleracao", "uniforme", "acelerado", "retardado"],
    explicacao: `Para dizer se um corpo está em **movimento** ou em **repouso** precisamos de um **referencial**. Estes conceitos são relativos: uma pessoa sentada no autocarro está em repouso em relação ao banco, mas em movimento em relação à estrada.

• **Trajetória**: o caminho descrito pelo corpo.
• **Rapidez média = distância percorrida ÷ tempo**, em metros por segundo (m/s).
• **Aceleração média = variação da velocidade ÷ tempo**, em m/s².

Os movimentos retilíneos analisam-se com gráficos:

• No gráfico **posição-tempo**, lemos onde estava o corpo em cada instante.
• No gráfico **velocidade-tempo**, vemos se o movimento é **uniforme** (velocidade constante), **acelerado** ou **retardado**. A área por baixo da linha é a **distância percorrida**.`,
    simples: `Estar parado ou em movimento depende de quem observa. A rapidez diz quantos metros andas por segundo. Se a velocidade aumenta, o movimento é acelerado; se diminui, é retardado; se não muda, é uniforme.`,
    exemplo: `Fazes 1200 m de bicicleta até à escola em 5 minutos (300 s). A tua rapidez média é 1200 m ÷ 300 s = **4 m/s**, cerca de 14 km/h.`,
    verificacao: {
      pergunta: "No gráfico velocidade-tempo, a linha é horizontal. Que tipo de movimento é?",
      resposta: "É um movimento uniforme: a velocidade não muda.",
    },
    treino: [
      {
        pergunta: "Um carro percorre 100 m em 5 s. Qual é a rapidez média?",
        opcoes: ["5 m/s", "20 m/s", "100 m/s", "500 m/s"],
        certa: 1,
        explicacao: "Rapidez média = 100 m ÷ 5 s = 20 m/s.",
      },
      {
        pergunta: "Num gráfico velocidade-tempo, a velocidade diminui ao longo do tempo. O movimento é…",
        opcoes: ["uniforme", "acelerado", "retardado", "em repouso"],
        certa: 2,
        explicacao: "Quando a velocidade diminui, o movimento é retardado.",
      },
      {
        pergunta: "Viajas num comboio em andamento, sem te levantares do banco. Em relação a quê estás em repouso?",
        opcoes: ["À estação", "Ao teu banco", "Às árvores lá fora", "À linha do comboio"],
        certa: 1,
        explicacao: "Em relação ao banco, a tua posição não muda. Em relação à estação, estás em movimento.",
      },
    ],
    seguintes: ["forcas", "seguranca-rodoviaria", "energia-mecanica"],
    fonte: `${AE} · Movimentos e Forças · Movimentos na Terra`,
    revisto: false,
  },

  {
    id: "seguranca-rodoviaria",
    titulo: "Travagem e segurança rodoviária",
    ano: 9,
    tema: "Movimentos e Forças",
    subtema: "Movimentos na Terra · Forças e Movimentos",
    palavras: ["travagem", "travar", "tempo de reacao", "distancia de reacao", "distancia de seguranca", "cinto", "airbag", "capacete", "seguranca rodoviaria", "acidente", " carro ", "automovel", "veiculo", "condutor"],
    explicacao: `Quando um condutor vê um perigo, o carro ainda anda bastante antes de parar:

• **Distância de reação**: o que o carro percorre durante o **tempo de reação**, desde que o condutor vê o perigo até carregar no travão. Aumenta com o cansaço, o álcool e as distrações, como o telemóvel.
• **Distância de travagem**: o que percorre desde que trava até parar. Aumenta com a velocidade e com a estrada molhada ou os pneus gastos.

**Distância de segurança = distância de reação + distância de travagem.**

As leis de Newton explicam os equipamentos de segurança: numa colisão, o corpo tende a continuar em movimento (**inércia**). O **cinto**, o **airbag** e o **capacete** seguram-no e prolongam a paragem, o que reduz a força sobre o corpo.`,
    simples: `Antes de travar, o condutor demora um bocadinho a reagir, e o carro continua a andar. Depois de travar, o carro ainda precisa de espaço para parar. Quanto mais depressa vai, mais espaço precisa. O cinto e o airbag seguram-te porque, num choque, o teu corpo quer continuar a andar.`,
    exemplo: `A 50 km/h, um carro anda cerca de 14 metros por segundo. Se o condutor demorar 1 segundo a reagir, porque estava a olhar para o telemóvel, o carro percorre 14 m antes sequer de começar a travar.`,
    verificacao: {
      pergunta: "Porque é que falar ao telemóvel a conduzir aumenta a distância de segurança?",
      resposta: "Porque aumenta o tempo de reação, e com ele a distância de reação.",
    },
    treino: [
      {
        pergunta: "A distância de segurança é a soma de…",
        opcoes: ["distância de reação e distância de travagem", "velocidade e tempo", "tempo de reação e tempo de travagem", "distância percorrida e trajetória"],
        certa: 0,
        explicacao: "Distância de segurança = distância de reação + distância de travagem.",
      },
      {
        pergunta: "Qual destes fatores aumenta a distância de travagem?",
        opcoes: ["Estrada seca", "Pneus novos", "Estrada molhada", "Velocidade mais baixa"],
        certa: 2,
        explicacao: "Com a estrada molhada há menos atrito entre os pneus e a estrada, e o carro precisa de mais espaço para parar.",
      },
      {
        pergunta: "Porque é que o cinto de segurança protege numa colisão?",
        opcoes: ["Porque faz o carro travar mais depressa", "Porque segura o corpo, que por inércia tende a continuar em movimento", "Porque diminui a massa do corpo", "Porque aumenta a velocidade"],
        certa: 1,
        explicacao: "Por inércia, o corpo continua em movimento quando o carro para. O cinto segura-o e reduz a força do impacto.",
      },
    ],
    seguintes: ["movimentos", "forcas", "energia-mecanica"],
    fonte: `${AE} · Movimentos e Forças · Movimentos na Terra; Forças e Movimentos`,
    revisto: false,
  },

  {
    id: "forcas",
    titulo: "Forças e leis de Newton",
    ano: 9,
    tema: "Movimentos e Forças",
    subtema: "Forças e Movimentos",
    palavras: ["forca", "forcas", "resultante", "leis de newton", "lei de newton", "inercia", "acao-reacao", "acao e reacao", "atrito", "interacao", "forca e aceleracao"],
    explicacao: `Uma **força** é uma interação entre corpos. Representa-se por um vetor e mede-se em **newtons (N)**. A soma de todas as forças que atuam num corpo é a **força resultante**.

As três **leis de Newton**:

• **1.ª lei (inércia)**: se a resultante é nula, o corpo fica parado ou continua em movimento retilíneo uniforme.
• **2.ª lei**: a resultante é diretamente proporcional à aceleração: **F = m × a**.
• **3.ª lei (ação-reação)**: as forças atuam sempre aos pares, em corpos diferentes, com a mesma intensidade e sentidos opostos.

O **atrito** opõe-se ao movimento. Às vezes é útil, porque sem ele não conseguíamos andar nem travar; outras vezes é preciso reduzi-lo, porque desgasta peças e gasta energia.`,
    simples: `Uma força é um empurrão ou um puxão. Se nada te empurra, ficas como estás. Quanto mais força fazes, mais depressa uma coisa acelera. E se empurras uma parede, a parede empurra-te de volta com a mesma força.`,
    exemplo: `Um carrinho de supermercado de 20 kg empurrado com uma força resultante de 30 N tem uma aceleração de 30 N ÷ 20 kg = **1,5 m/s²**. Cheio de compras, com a mesma força, acelera muito menos.`,
    verificacao: {
      pergunta: "Quando saltas de um barco para o cais, o barco afasta-se. Que lei de Newton explica isto?",
      resposta: "A 3.ª lei (ação-reação): tu empurras o barco e o barco empurra-te a ti, com a mesma intensidade e em sentido oposto.",
    },
    treino: [
      {
        pergunta: "Uma força resultante de 10 N atua num corpo de 2 kg. Qual é a aceleração?",
        opcoes: ["5 m/s²", "20 m/s²", "12 m/s²", "0,2 m/s²"],
        certa: 0,
        explicacao: "Pela 2.ª lei, a = F ÷ m = 10 N ÷ 2 kg = 5 m/s².",
      },
      {
        pergunta: "Segundo a 3.ª lei de Newton, as forças de um par ação-reação…",
        opcoes: ["atuam no mesmo corpo", "atuam em corpos diferentes", "têm intensidades diferentes", "têm o mesmo sentido"],
        certa: 1,
        explicacao: "Atuam em corpos diferentes, com a mesma intensidade, a mesma direção e sentidos opostos.",
      },
      {
        pergunta: "Em qual destas situações o atrito é útil?",
        opcoes: ["No desgaste dos travões", "Ao caminhar sem escorregar", "No aquecimento de um motor", "No desgaste dos pneus"],
        certa: 1,
        explicacao: "É o atrito entre os sapatos e o chão que nos permite andar sem escorregar.",
      },
    ],
    seguintes: ["movimentos", "seguranca-rodoviaria", "arquimedes"],
    fonte: `${AE} · Movimentos e Forças · Forças e Movimentos`,
    revisto: false,
  },

  {
    id: "energia-mecanica",
    titulo: "Energia cinética e potencial",
    ano: 9,
    tema: "Movimentos e Forças",
    subtema: "Forças, Movimentos e Energia",
    palavras: ["energia cinetica", "energia potencial", "potencial gravitica", "energia mecanica", "cinetica", "transformacoes de energia", "transformacao de energia"],
    explicacao: `Há dois tipos fundamentais de energia:

• **Energia cinética**: a energia associada ao movimento. Depende da **massa** e da **velocidade** do corpo: **Ec = ½ × m × v²**. Se a velocidade duplica, a energia cinética fica quatro vezes maior.
• **Energia potencial gravítica**: a energia associada à posição em altura, perto da superfície da Terra. Depende da **massa** e da **altura**: **Ep = m × g × h**.

Quando um corpo cai, a energia potencial gravítica transforma-se em energia cinética. Quando sobe, acontece o contrário.

Também se pode transferir energia de um sistema para outro através de forças: quando empurras um carrinho, a tua força transfere-lhe energia e ele ganha velocidade.`,
    simples: `Uma coisa que se move tem energia de movimento (cinética). Uma coisa que está no alto tem energia guardada (potencial), que se transforma em movimento quando cai. Quanto mais pesada e mais rápida, mais energia de movimento tem.`,
    exemplo: `Numa montanha-russa, o carrinho sobe devagar até ao ponto mais alto, onde tem muita energia potencial gravítica. Na descida, essa energia transforma-se em energia cinética, e é por isso que ganha tanta velocidade.`,
    verificacao: {
      pergunta: "Uma bola cai de uma janela. Que energia aumenta e que energia diminui durante a queda?",
      resposta: "A energia cinética aumenta e a energia potencial gravítica diminui.",
    },
    treino: [
      {
        pergunta: "De que grandezas depende a energia cinética?",
        opcoes: ["Da massa e da altura", "Da massa e da velocidade", "Só da altura", "Da temperatura"],
        certa: 1,
        explicacao: "Ec = ½ × m × v²: depende da massa e da velocidade.",
      },
      {
        pergunta: "Qual é a energia potencial gravítica de um corpo de 2 kg a 5 m de altura? (g = 10 m/s²)",
        opcoes: ["10 J", "50 J", "100 J", "7 J"],
        certa: 2,
        explicacao: "Ep = m × g × h = 2 × 10 × 5 = 100 J.",
      },
      {
        pergunta: "Se a velocidade de um carro duplicar, a sua energia cinética…",
        opcoes: ["duplica", "fica igual", "fica quatro vezes maior", "fica para metade"],
        certa: 2,
        explicacao: "A energia cinética depende do quadrado da velocidade: 2² = 4.",
      },
    ],
    seguintes: ["movimentos", "energia", "seguranca-rodoviaria"],
    fonte: `${AE} · Movimentos e Forças · Forças, Movimentos e Energia`,
    revisto: false,
  },

  {
    id: "arquimedes",
    titulo: "Impulsão e Lei de Arquimedes",
    ano: 9,
    tema: "Movimentos e Forças",
    subtema: "Forças e Fluidos",
    palavras: ["arquimedes", "impulsao", "fluido", "fluidos", " barco ", "navio", "submarino", "flutuac"],
    explicacao: `Um corpo mergulhado num líquido ou num gás (um **fluido**) sofre uma força vertical, de baixo para cima, chamada **impulsão**.

A **Lei de Arquimedes** diz que a impulsão é igual ao **peso do fluido deslocado** pela parte do corpo que está mergulhada.

Comparando o peso do corpo com a impulsão:

• Se o peso é **maior** do que a impulsão máxima (com o corpo todo mergulhado), o corpo **afunda**.
• Se o corpo **flutua**, a impulsão equilibra o peso: o corpo fica parcialmente mergulhado, só o necessário para deslocar um peso de água igual ao seu.

É por isso que um navio de aço flutua: a sua forma desloca muita água, e a impulsão iguala o peso do navio.`,
    simples: `A água empurra para cima tudo o que lá pomos: é a impulsão. Se o objeto for mais pesado do que esse empurrão consegue aguentar, afunda; se não, flutua. Um barco flutua porque a sua forma afasta muita água.`,
    exemplo: `Na piscina, sentes-te mais leve. A tua massa não mudou: é a impulsão da água a empurrar-te para cima, contrariando parte do teu peso.`,
    verificacao: {
      pergunta: "Porque é que uma bola de plasticina afunda, mas a mesma plasticina em forma de barquinho flutua?",
      resposta: "Em forma de barco, desloca muito mais água, por isso a impulsão aumenta até igualar o peso.",
    },
    treino: [
      {
        pergunta: "A impulsão é igual…",
        opcoes: ["à massa do corpo", "ao peso do fluido deslocado", "ao volume do corpo", "ao peso do corpo, sempre"],
        certa: 1,
        explicacao: "Pela Lei de Arquimedes, a impulsão é igual ao peso do fluido deslocado.",
      },
      {
        pergunta: "Um corpo mergulhado totalmente tem um peso maior do que a impulsão. O que acontece?",
        opcoes: ["Flutua", "Afunda", "Fica a meio, parado", "Sobe à superfície"],
        certa: 1,
        explicacao: "Se o peso é maior do que a impulsão máxima, a resultante aponta para baixo e o corpo afunda.",
      },
      {
        pergunta: "Qual é o sentido da impulsão?",
        opcoes: ["De cima para baixo", "De baixo para cima", "Horizontal", "Depende do corpo"],
        certa: 1,
        explicacao: "A impulsão é sempre vertical, de baixo para cima.",
      },
    ],
    seguintes: ["densidade", "forcas", "energia-mecanica"],
    fonte: `${AE} · Movimentos e Forças · Forças e Fluidos`,
    revisto: false,
  },

  {
    id: "eletricidade",
    titulo: "Circuitos elétricos",
    ano: 9,
    tema: "Eletricidade",
    subtema: "Corrente Elétrica, Circuitos Elétricos, Efeitos da Corrente Elétrica e Energia Elétrica",
    palavras: ["circuito", "circuitos", "corrente eletrica", "tensao", "resistencia", "amperimetro", "voltimetro", "em serie", "em paralelo", "pilha", "lampada", "lampadas", "interruptor", " ohm ", "ohms"],
    explicacao: `Um **circuito elétrico** é um caminho fechado por onde passa **corrente elétrica**. Tem um **gerador** (pilha), **recetores** (lâmpadas, motores), fios e, normalmente, um interruptor.

Três grandezas elétricas:

• **Corrente elétrica (I)**: em **amperes (A)**, medida com um **amperímetro** ligado em série.
• **Tensão elétrica (U)**: em **volts (V)**, medida com um **voltímetro** ligado em paralelo.
• **Resistência elétrica (R)**: em **ohms (Ω)**. **R = U ÷ I**.

Os recetores podem associar-se de duas formas:

• **Em série**: a corrente é igual em todo o circuito e as tensões somam-se. Se uma lâmpada fundir, as outras apagam-se.
• **Em paralelo**: a tensão é igual em cada ramo e as correntes somam-se. É assim nas nossas casas.`,
    simples: `A corrente elétrica precisa de um caminho fechado para passar. Lâmpadas em série estão uma a seguir à outra: se uma fundir, apagam todas. Em paralelo, cada uma tem o seu caminho: se uma fundir, as outras continuam acesas.`,
    exemplo: `As luzes de Natal antigas apagavam-se todas quando uma lâmpada fundia: estavam ligadas em série. Em casa, desligar a luz da cozinha não apaga a do quarto, porque as ligações estão em paralelo.`,
    verificacao: {
      pergunta: "Como se liga um amperímetro num circuito?",
      resposta: "Em série com o componente onde se quer medir a corrente.",
    },
    treino: [
      {
        pergunta: "Em que unidade se mede a tensão elétrica?",
        opcoes: ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
        certa: 1,
        explicacao: "A tensão mede-se em volts, com um voltímetro ligado em paralelo.",
      },
      {
        pergunta: "Numa associação em série, o que acontece se uma lâmpada fundir?",
        opcoes: ["As outras ficam mais brilhantes", "As outras apagam-se", "Nada muda", "Só a seguinte apaga"],
        certa: 1,
        explicacao: "Em série há um só caminho para a corrente. Se se interromper, a corrente deixa de passar em todo o circuito.",
      },
      {
        pergunta: "Um recetor tem 6 V de tensão e 2 A de corrente. Qual é a sua resistência?",
        opcoes: ["3 Ω", "12 Ω", "8 Ω", "4 Ω"],
        certa: 0,
        explicacao: "R = U ÷ I = 6 V ÷ 2 A = 3 Ω.",
      },
    ],
    seguintes: ["energia-eletrica", "estrutura-atomica", "energia"],
    fonte: `${AE} · Eletricidade · Corrente Elétrica, Circuitos Elétricos, Efeitos da Corrente Elétrica e Energia Elétrica`,
    revisto: false,
  },

  {
    id: "energia-eletrica",
    titulo: "Efeitos da corrente e energia elétrica",
    ano: 9,
    tema: "Eletricidade",
    subtema: "Corrente Elétrica, Circuitos Elétricos, Efeitos da Corrente Elétrica e Energia Elétrica",
    palavras: ["efeito joule", "efeitos da corrente", "efeito termico", "efeito magnetico", "efeito quimico", "eletroiman", "potencia", "watt", "kwh", "quilowatt", "fatura da luz", "consumo de energia", "choque eletrico", "seguranca eletrica", "tomada", "tomadas", "aparelhos eletricos"],
    explicacao: `A corrente elétrica tem três efeitos com muitas aplicações:

• **Efeito térmico** (efeito Joule): aquece os condutores. Torradeiras, aquecedores, secadores.
• **Efeito magnético**: cria um campo magnético. Eletroímanes, campainhas, motores elétricos.
• **Efeito químico**: provoca reações químicas. Carregar baterias, revestir objetos com metal.

A **potência** de um aparelho, em **watts (W)**, diz a energia que gasta por segundo. Um aparelho mais potente gasta mais energia no mesmo tempo. Por isso cada casa contrata uma potência máxima à empresa de eletricidade.

Regras de segurança: nunca mexer em aparelhos ligados com as mãos molhadas, não sobrecarregar tomadas com muitas fichas e não meter objetos nas tomadas.`,
    simples: `A eletricidade pode aquecer (torradeira), criar magnetismo (motores) ou provocar reações químicas (carregar o telemóvel). A potência diz quanta energia um aparelho gasta: um aquecedor gasta muito mais do que uma lâmpada LED.`,
    exemplo: `Um aquecedor de 2000 W ligado durante 1 hora gasta tanta energia como uma lâmpada LED de 10 W acesa durante 200 horas, mais de 8 dias seguidos!`,
    verificacao: {
      pergunta: "Que efeito da corrente elétrica é usado numa torradeira?",
      resposta: "O efeito térmico (efeito Joule): a corrente aquece as resistências.",
    },
    treino: [
      {
        pergunta: "Um motor elétrico funciona graças a que efeito da corrente?",
        opcoes: ["Térmico", "Magnético", "Químico", "Luminoso"],
        certa: 1,
        explicacao: "Os motores usam o efeito magnético da corrente elétrica.",
      },
      {
        pergunta: "Em que unidade se mede a potência de um aparelho?",
        opcoes: ["Volt (V)", "Ampere (A)", "Watt (W)", "Newton (N)"],
        certa: 2,
        explicacao: "A potência mede-se em watts.",
      },
      {
        pergunta: "Qual destas é uma regra de segurança elétrica?",
        opcoes: ["Ligar muitas fichas na mesma tomada", "Mexer no secador com as mãos molhadas", "Desligar o aparelho da tomada antes de o limpar", "Puxar a ficha pelo fio"],
        certa: 2,
        explicacao: "Desligar o aparelho antes de o limpar evita choques elétricos.",
      },
    ],
    seguintes: ["eletricidade", "energia", "transformacoes"],
    fonte: `${AE} · Eletricidade · Corrente Elétrica, Circuitos Elétricos, Efeitos da Corrente Elétrica e Energia Elétrica`,
    revisto: false,
  },

  {
    id: "estrutura-atomica",
    titulo: "Estrutura do átomo",
    ano: 9,
    tema: "Classificação dos Materiais",
    subtema: "Estrutura Atómica",
    palavras: ["numero atomico", "numero de massa", "isotopo", "distribuicao eletronica", "configuracao eletronica", "eletroes de valencia", "eletrao de valencia", "valencia", "nivel de energia", "niveis de energia", "modelo atomico", "nuvem eletronica"],
    explicacao: `No **modelo atómico atual**, o átomo tem um **núcleo** muito pequeno, com protões e neutrões, e uma **nuvem eletrónica**: não sabemos exatamente onde está cada eletrão, só onde é mais provável encontrá-lo.

• **Número atómico (Z)**: número de protões. Identifica o elemento.
• **Número de massa (A)**: protões + neutrões.
• **Isótopos**: átomos do mesmo elemento com diferente número de neutrões.

Os eletrões distribuem-se por **níveis de energia**. Até Z = 20, cabem no máximo 2, 8, 8 e 2 eletrões, por esta ordem. Por exemplo, o sódio (Z = 11) fica com **2, 8, 1**.

Os eletrões do último nível são os **eletrões de valência**. Num **ião**, o número de eletrões muda: o Na⁺ fica com 2, 8.`,
    simples: `O átomo tem um centro minúsculo, o núcleo, e os eletrões andam à volta numa espécie de nuvem, organizados por andares. O número de protões diz que elemento é. Os eletrões do último andar são os mais importantes para as ligações.`,
    exemplo: `O carbono-14 é um isótopo do carbono com 8 neutrões em vez de 6. Como se transforma muito devagar ao longo do tempo, os cientistas usam-no para saber a idade de ossos e de madeiras antigas.`,
    verificacao: {
      pergunta: "Qual é a distribuição eletrónica do cloro (Z = 17)?",
      resposta: "2, 8, 7. Tem 7 eletrões de valência.",
    },
    treino: [
      {
        pergunta: "O que indica o número atómico?",
        opcoes: ["O número de neutrões", "O número de protões", "A soma de protões e neutrões", "O número de níveis"],
        certa: 1,
        explicacao: "O número atómico (Z) é o número de protões, e identifica o elemento químico.",
      },
      {
        pergunta: "Qual é a distribuição eletrónica do magnésio (Z = 12)?",
        opcoes: ["2, 10", "2, 8, 2", "8, 4", "2, 2, 8"],
        certa: 1,
        explicacao: "12 eletrões: 2 no primeiro nível, 8 no segundo e 2 no terceiro.",
      },
      {
        pergunta: "O que são isótopos?",
        opcoes: ["Átomos de elementos diferentes com a mesma massa", "Átomos do mesmo elemento com diferente número de neutrões", "Iões negativos", "Moléculas com dois átomos"],
        certa: 1,
        explicacao: "Os isótopos têm o mesmo número de protões, mas diferente número de neutrões.",
      },
    ],
    seguintes: ["tabela", "ligacao", "atomos"],
    fonte: `${AE} · Classificação dos Materiais · Estrutura Atómica`,
    revisto: false,
  },

  {
    id: "tabela",
    titulo: "Tabela Periódica",
    ano: 9,
    tema: "Classificação dos Materiais",
    subtema: "Propriedades dos Materiais e Tabela Periódica dos Elementos Químicos",
    palavras: ["tabela periodica", "tabela", "periodos e grupos", "grupos e periodos", "metal", "metais", "nao-metal", "nao metal", "nao metais", "gases nobres", "gas nobre", "nobre", "halogene", "alcalino", "alcalinos", "grupo 1", "grupo 2", "corpo humano"],
    explicacao: `A **Tabela Periódica** ordena os 118 elementos por **número atómico** crescente.

• As **linhas** são os **períodos**: o número do período é o número de níveis com eletrões.
• As **colunas** são os **grupos**: os elementos do mesmo grupo têm o mesmo número de eletrões de valência e, por isso, propriedades químicas parecidas.

Grupos a conhecer:

• **Grupo 1**, metais alcalinos (sódio, potássio): reagem violentamente com a água.
• **Grupo 2**, metais alcalinoterrosos (magnésio, cálcio).
• **Grupo 17**, halogéneos (flúor, cloro).
• **Grupo 18**, gases nobres (hélio, néon), que quase não reagem.

Os **metais** têm brilho e conduzem bem o calor e a eletricidade; os **não-metais**, em geral, não. No corpo humano, 96 % da massa são oxigénio, carbono, hidrogénio e azoto.`,
    simples: `A Tabela Periódica é como um mapa de todos os elementos químicos, ordenados pelo número de protões. Os elementos da mesma coluna comportam-se de forma parecida. À esquerda ficam os metais; à direita, a maior parte dos não-metais.`,
    exemplo: `O sódio e o potássio estão no mesmo grupo e reagem os dois de forma explosiva com a água. É por isso que, no laboratório, se guardam em óleo e só o professor os manipula.`,
    verificacao: {
      pergunta: "O cloro (Z = 17) tem distribuição eletrónica 2, 8, 7. Em que período e em que grupo está?",
      resposta: "No 3.º período (3 níveis com eletrões) e no grupo 17 (7 eletrões de valência).",
    },
    treino: [
      {
        pergunta: "Como se chamam os elementos do grupo 18?",
        opcoes: ["Metais alcalinos", "Halogéneos", "Gases nobres", "Metais alcalinoterrosos"],
        certa: 2,
        explicacao: "O grupo 18 é o dos gases nobres, que quase não reagem.",
      },
      {
        pergunta: "Porque é que os elementos do mesmo grupo têm propriedades químicas parecidas?",
        opcoes: ["Porque têm a mesma massa", "Porque têm o mesmo número de eletrões de valência", "Porque têm o mesmo número de neutrões", "Porque estão no mesmo período"],
        certa: 1,
        explicacao: "As propriedades químicas dependem sobretudo dos eletrões de valência, que são iguais no mesmo grupo.",
      },
      {
        pergunta: "Qual destas é uma propriedade típica dos metais?",
        opcoes: ["Não conduzem a eletricidade", "São todos gases", "Conduzem bem o calor e a eletricidade", "Não têm brilho"],
        certa: 2,
        explicacao: "Os metais têm brilho e são bons condutores de calor e de eletricidade.",
      },
    ],
    seguintes: ["estrutura-atomica", "ligacao", "atomos"],
    fonte: `${AE} · Classificação dos Materiais · Propriedades dos Materiais e Tabela Periódica dos Elementos Químicos`,
    revisto: false,
  },

  {
    id: "ligacao",
    titulo: "Ligação química",
    ano: 9,
    tema: "Classificação dos Materiais",
    subtema: "Ligação Química",
    palavras: ["ligacao quimica", "ligacoes quimicas", "ligacao covalente", "covalente", "octeto", " lewis ", "ligacao simples", "ligacao dupla", "ligacao tripla", "hidrocarboneto", "saturado", "insaturado", "rede covalente", "diamante", "grafite", "partilha de eletroes", " se ligam", "ligam-se", "atomos se ligam", "atomos ligam"],
    explicacao: `Os átomos ligam-se para ficarem mais estáveis. Muitos ficam estáveis com 8 eletrões de valência: é a **regra do octeto**.

Na **ligação covalente**, átomos de não-metais **partilham pares de eletrões**. Pode ser:

• **Simples**: um par partilhado (H–H, no hidrogénio).
• **Dupla**: dois pares (O=O, no oxigénio).
• **Tripla**: três pares (N≡N, no azoto).

Na **notação de Lewis**, os eletrões de valência representam-se por pontos ou traços à volta do símbolo químico.

As ligações covalentes formam **moléculas** (água, oxigénio), que dão **substâncias moleculares**, ou **redes** de átomos (diamante, grafite), que dão **substâncias covalentes**.

Os **hidrocarbonetos** só têm carbono e hidrogénio. São **saturados** se só têm ligações simples (metano, CH₄) e **insaturados** se têm ligações duplas ou triplas (eteno, C₂H₄).`,
    simples: `Os átomos juntam-se partilhando eletrões, como amigos que partilham peças para completar uma coleção de 8. Partilhar um par de eletrões é uma ligação simples; dois pares, dupla; três pares, tripla.`,
    exemplo: `O diamante e a grafite do teu lápis são feitos do mesmo elemento: carbono. A diferença está na forma como os átomos se ligam. No diamante formam uma rede muito rígida; na grafite, camadas que deslizam e deixam marca no papel.`,
    verificacao: {
      pergunta: "Quantos pares de eletrões são partilhados numa ligação dupla?",
      resposta: "Dois pares de eletrões.",
    },
    treino: [
      {
        pergunta: "Na ligação covalente, os átomos…",
        opcoes: ["perdem todos os eletrões", "partilham pares de eletrões", "trocam protões", "não têm eletrões de valência"],
        certa: 1,
        explicacao: "A ligação covalente é a partilha de pares de eletrões entre átomos, normalmente de não-metais.",
      },
      {
        pergunta: "Que tipo de ligação existe na molécula de azoto, N₂?",
        opcoes: ["Simples", "Dupla", "Tripla", "Não tem ligação"],
        certa: 2,
        explicacao: "Os dois átomos de azoto partilham três pares de eletrões: ligação tripla.",
      },
      {
        pergunta: "O metano (CH₄) é um hidrocarboneto…",
        opcoes: ["insaturado, porque tem ligações duplas", "saturado, porque só tem ligações simples", "que tem oxigénio", "que não tem hidrogénio"],
        certa: 1,
        explicacao: "No metano, o carbono faz quatro ligações simples com o hidrogénio: é saturado.",
      },
    ],
    seguintes: ["estrutura-atomica", "tabela", "atomos"],
    fonte: `${AE} · Classificação dos Materiais · Ligação Química`,
    revisto: false,
  },
];
