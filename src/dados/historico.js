// Histórico do Newton guardado no navegador do aluno (Fase 3 do PRD).
// Usa o IndexedDB; se o navegador o bloquear, guarda só em memória e o Newton continua a funcionar.
// Nada sai do computador do aluno (Guidelines P11).
//
// A estrutura é igual à das futuras tabelas do Supabase (Fase 8), para importar o histórico local
// quando o aluno criar conta:
//   perfis     { id, ano, alcunha, criadoEm }
//   conversas  { id, perfilId, titulo, temaId, criadaEm, atualizadaEm }
//   mensagens  { id, conversaId, ordem, autor, texto, tipo, temaId, seguintes, situacao, criadaEm }
// Datas em ISO 8601; ids em UUID.

const NOME_BASE = "newton";
const VERSAO = 1;
const LOJAS = ["perfis", "conversas", "mensagens"];

// ---------- IndexedDB com promessas ----------

const pedido = (req) =>
  new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const fimTransacao = (tx) =>
  new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error ?? new Error("A operação foi cancelada."));
  });

function abrirBase(fabrica) {
  return new Promise((resolve, reject) => {
    const req = fabrica.open(NOME_BASE, VERSAO);
    req.onupgradeneeded = () => {
      const base = req.result;
      base.createObjectStore("perfis", { keyPath: "id" });
      const conversas = base.createObjectStore("conversas", { keyPath: "id" });
      conversas.createIndex("perfilId", "perfilId");
      const mensagens = base.createObjectStore("mensagens", { keyPath: "id" });
      mensagens.createIndex("conversaId", "conversaId");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("A base de dados está bloqueada por outro separador."));
  });
}

// Cada armazenamento oferece a mesma forma de executar operações, dentro de uma transação.
function armazenamentoIndexedDB(base) {
  return {
    modo: "indexeddb",
    async executar(lojas, tipo, operacao) {
      const tx = base.transaction(lojas, tipo);
      const fim = fimTransacao(tx);
      const acesso = {
        obter: (loja, id) => pedido(tx.objectStore(loja).get(id)),
        todos: (loja) => pedido(tx.objectStore(loja).getAll()),
        porIndice: (loja, indice, valor) => pedido(tx.objectStore(loja).index(indice).getAll(valor)),
        guardar: (loja, objeto) => pedido(tx.objectStore(loja).put(objeto)),
        apagar: (loja, id) => pedido(tx.objectStore(loja).delete(id)),
        limpar: (loja) => pedido(tx.objectStore(loja).clear()),
      };
      let resultado;
      try {
        resultado = await operacao(acesso);
      } catch (erro) {
        try {
          tx.abort();
        } catch {
          // a transação já tinha terminado
        }
        fim.catch(() => {});
        throw erro;
      }
      await fim;
      return resultado;
    },
  };
}

// Plano B: quando o IndexedDB não está disponível (por exemplo, bloqueado pelo navegador).
// Os dados perdem-se ao fechar a página.
function armazenamentoMemoria() {
  const lojas = Object.fromEntries(LOJAS.map((loja) => [loja, new Map()]));
  const copia = (objeto) => (objeto === undefined ? undefined : structuredClone(objeto));
  const acesso = {
    obter: async (loja, id) => copia(lojas[loja].get(id)),
    todos: async (loja) => [...lojas[loja].values()].map(copia),
    porIndice: async (loja, indice, valor) => [...lojas[loja].values()].filter((o) => o[indice] === valor).map(copia),
    guardar: async (loja, objeto) => void lojas[loja].set(objeto.id, copia(objeto)),
    apagar: async (loja, id) => void lojas[loja].delete(id),
    limpar: async (loja) => void lojas[loja].clear(),
  };
  return { modo: "memoria", executar: (_lojas, _tipo, operacao) => operacao(acesso) };
}

// ---------- Histórico ----------

/**
 * Abre o histórico. As opções servem para os testes:
 *   fabrica  o IndexedDB a usar (por omissão, o do navegador)
 *   agora    função que devolve a data atual em ISO 8601
 *   novoId   função que devolve um id novo
 */
export async function abrirHistorico({
  fabrica = globalThis.indexedDB,
  agora = () => new Date().toISOString(),
  novoId = () => crypto.randomUUID(),
} = {}) {
  let armazenamento;
  try {
    if (!fabrica) throw new Error("O IndexedDB não está disponível.");
    armazenamento = armazenamentoIndexedDB(await abrirBase(fabrica));
  } catch {
    armazenamento = armazenamentoMemoria();
  }
  const executar = (lojas, tipo, operacao) => armazenamento.executar(lojas, tipo, operacao);

  // Há um só perfil por navegador; é criado na primeira utilização.
  const perfilOuNovo = async (acesso) => {
    const [perfil] = await acesso.todos("perfis");
    if (perfil) return perfil;
    const novo = { id: novoId(), ano: null, alcunha: null, criadoEm: agora() };
    await acesso.guardar("perfis", novo);
    return novo;
  };

  return {
    /** "indexeddb" (guarda no navegador) ou "memoria" (perde-se ao fechar a página). */
    get modo() {
      return armazenamento.modo;
    },

    obterPerfil() {
      return executar(["perfis"], "readwrite", perfilOuNovo);
    },

    atualizarPerfil(alteracoes) {
      return executar(["perfis"], "readwrite", async (acesso) => {
        const perfil = { ...(await perfilOuNovo(acesso)), ...alteracoes };
        await acesso.guardar("perfis", perfil);
        return perfil;
      });
    },

    criarConversa({ titulo = "Nova conversa", temaId = null } = {}) {
      return executar(["perfis", "conversas"], "readwrite", async (acesso) => {
        const perfil = await perfilOuNovo(acesso);
        const momento = agora();
        const conversa = { id: novoId(), perfilId: perfil.id, titulo, temaId, criadaEm: momento, atualizadaEm: momento };
        await acesso.guardar("conversas", conversa);
        return conversa;
      });
    },

    /** Junta uma mensagem e atualiza a data da conversa, numa só transação. */
    adicionarMensagem(conversaId, { autor, texto, tipo = null, temaId = null, seguintes = [], situacao = null }) {
      if (autor !== "aluno" && autor !== "newton") throw new Error(`Autor inválido: ${autor}`);
      return executar(["conversas", "mensagens"], "readwrite", async (acesso) => {
        const conversa = await acesso.obter("conversas", conversaId);
        if (!conversa) throw new Error("Essa conversa já não existe.");
        const anteriores = await acesso.porIndice("mensagens", "conversaId", conversaId);
        const mensagem = {
          id: novoId(),
          conversaId,
          ordem: anteriores.length,
          autor,
          texto,
          tipo,
          temaId,
          seguintes,
          situacao,
          criadaEm: agora(),
        };
        await acesso.guardar("mensagens", mensagem);
        await acesso.guardar("conversas", {
          ...conversa,
          temaId: conversa.temaId ?? temaId,
          atualizadaEm: mensagem.criadaEm,
        });
        return mensagem;
      });
    },

    /** Todas as conversas, da mais recente para a mais antiga. */
    listarConversas() {
      return executar(["conversas"], "readonly", async (acesso) =>
        (await acesso.todos("conversas")).sort((a, b) => b.atualizadaEm.localeCompare(a.atualizadaEm)),
      );
    },

    /** Uma conversa e as suas mensagens, pela ordem em que foram escritas; null se não existir. */
    obterConversa(conversaId) {
      return executar(["conversas", "mensagens"], "readonly", async (acesso) => {
        const conversa = await acesso.obter("conversas", conversaId);
        if (!conversa) return null;
        const mensagens = (await acesso.porIndice("mensagens", "conversaId", conversaId)).sort((a, b) => a.ordem - b.ordem);
        return { conversa, mensagens };
      });
    },

    async ultimaConversa() {
      const [conversa] = await this.listarConversas();
      return conversa ?? null;
    },

    renomearConversa(conversaId, titulo) {
      return executar(["conversas"], "readwrite", async (acesso) => {
        const conversa = await acesso.obter("conversas", conversaId);
        if (!conversa) return null;
        const atualizada = { ...conversa, titulo };
        await acesso.guardar("conversas", atualizada);
        return atualizada;
      });
    },

    apagarConversa(conversaId) {
      return executar(["conversas", "mensagens"], "readwrite", async (acesso) => {
        for (const mensagem of await acesso.porIndice("mensagens", "conversaId", conversaId)) {
          await acesso.apagar("mensagens", mensagem.id);
        }
        await acesso.apagar("conversas", conversaId);
      });
    },

    /** Volta a guardar uma conversa apagada, com as mesmas mensagens (para o "Anular"). */
    restaurarConversa({ conversa, mensagens }) {
      return executar(["conversas", "mensagens"], "readwrite", async (acesso) => {
        await acesso.guardar("conversas", conversa);
        for (const mensagem of mensagens) await acesso.guardar("mensagens", mensagem);
      });
    },

    /** Apaga todas as conversas; o perfil (ano) mantém-se. */
    apagarHistorico() {
      return executar(["conversas", "mensagens"], "readwrite", async (acesso) => {
        await acesso.limpar("mensagens");
        await acesso.limpar("conversas");
      });
    },

    /** Apaga tudo o que o Newton guardou neste navegador, incluindo o perfil. */
    apagarTudo() {
      return executar(LOJAS, "readwrite", async (acesso) => {
        for (const loja of LOJAS) await acesso.limpar(loja);
      });
    },
  };
}

/**
 * Pede ao navegador para não apagar o histórico quando precisar de espaço.
 * Devolve true se o armazenamento ficou persistente.
 */
export async function pedirArmazenamentoPersistente() {
  try {
    if (await navigator.storage?.persisted?.()) return true;
    return (await navigator.storage?.persist?.()) ?? false;
  } catch {
    return false;
  }
}
