// Testes da camada de dados do histórico (Fase 3.2).
// Usam um IndexedDB simulado (fake-indexeddb): cada teste começa com um navegador "limpo".

import { IDBFactory } from "fake-indexeddb";
import { beforeEach, describe, expect, it } from "vitest";
import { abrirHistorico } from "../src/dados/historico.js";

// Relógio e ids previsíveis, para as ordenações serem testáveis.
function relogio() {
  let segundos = 0;
  return () => new Date(Date.UTC(2026, 9, 26, 9, 0, segundos++)).toISOString();
}
function contadorIds() {
  let n = 0;
  return () => `id-${++n}`;
}

// Lê diretamente a base de dados, para confirmar que "apagar" apaga mesmo (sem dados escondidos).
async function registosGuardados(loja) {
  const base = await new Promise((resolve, reject) => {
    const req = fabrica.open("newton");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  const registos = await new Promise((resolve, reject) => {
    const req = base.transaction(loja).objectStore(loja).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  base.close();
  return registos;
}

let fabrica;
let historico;

beforeEach(async () => {
  fabrica = new IDBFactory();
  historico = await abrirHistorico({ fabrica, agora: relogio(), novoId: contadorIds() });
});

describe("perfil", () => {
  it("cria um só perfil, vazio, e devolve sempre o mesmo", async () => {
    const primeiro = await historico.obterPerfil();
    const segundo = await historico.obterPerfil();
    expect(primeiro).toEqual(segundo);
    expect(primeiro).toMatchObject({ ano: null, alcunha: null });
  });

  it("guarda o ano do aluno", async () => {
    await historico.atualizarPerfil({ ano: 8 });
    expect((await historico.obterPerfil()).ano).toBe(8);
  });
});

describe("conversas e mensagens", () => {
  it("guarda as mensagens pela ordem em que foram escritas", async () => {
    const conversa = await historico.criarConversa({ titulo: "Densidade" });
    await historico.adicionarMensagem(conversa.id, { autor: "aluno", texto: "O que é a densidade?" });
    await historico.adicionarMensagem(conversa.id, {
      autor: "newton",
      texto: "A massa volúmica…",
      tipo: "tema",
      temaId: "densidade",
      seguintes: ["misturas"],
    });

    const { mensagens } = await historico.obterConversa(conversa.id);
    expect(mensagens.map((m) => m.autor)).toEqual(["aluno", "newton"]);
    expect(mensagens.map((m) => m.ordem)).toEqual([0, 1]);
    expect(mensagens[1]).toMatchObject({ temaId: "densidade", seguintes: ["misturas"] });
  });

  it("atualiza a data e o tema da conversa quando chega uma mensagem", async () => {
    const conversa = await historico.criarConversa();
    const mensagem = await historico.adicionarMensagem(conversa.id, { autor: "newton", texto: "…", temaId: "som" });
    const { conversa: atualizada } = await historico.obterConversa(conversa.id);
    expect(atualizada.atualizadaEm).toBe(mensagem.criadaEm);
    expect(atualizada.temaId).toBe("som");
  });

  it("lista as conversas da mais recente para a mais antiga", async () => {
    const antiga = await historico.criarConversa({ titulo: "Antiga" });
    const recente = await historico.criarConversa({ titulo: "Recente" });
    expect((await historico.listarConversas()).map((c) => c.id)).toEqual([recente.id, antiga.id]);

    // Uma mensagem nova faz a conversa antiga voltar ao topo
    await historico.adicionarMensagem(antiga.id, { autor: "aluno", texto: "Voltei" });
    expect((await historico.ultimaConversa()).id).toBe(antiga.id);
  });

  it("recusa mensagens para uma conversa que não existe, sem gravar nada", async () => {
    await expect(historico.adicionarMensagem("nao-existe", { autor: "aluno", texto: "Olá" })).rejects.toThrow();
    expect(await historico.listarConversas()).toEqual([]);
  });

  it("recusa um autor inválido", () => {
    expect(() => historico.adicionarMensagem("x", { autor: "professor", texto: "Olá" })).toThrow();
  });

  it("muda o título de uma conversa", async () => {
    const conversa = await historico.criarConversa();
    await historico.renomearConversa(conversa.id, "Ácidos e bases");
    expect((await historico.obterConversa(conversa.id)).conversa.titulo).toBe("Ácidos e bases");
  });
});

describe("os dados continuam lá depois de fechar a página", () => {
  it("abrir o histórico de novo no mesmo navegador encontra as conversas", async () => {
    const conversa = await historico.criarConversa({ titulo: "Sistema Solar" });
    await historico.adicionarMensagem(conversa.id, { autor: "aluno", texto: "Quantos planetas há?" });

    const reaberto = await abrirHistorico({ fabrica });
    const { conversa: guardada, mensagens } = await reaberto.obterConversa(conversa.id);
    expect(guardada.titulo).toBe("Sistema Solar");
    expect(mensagens).toHaveLength(1);
    expect(reaberto.modo).toBe("indexeddb");
  });
});

describe("apagar", () => {
  it("apagar uma conversa remove as suas mensagens e deixa as outras", async () => {
    const a = await historico.criarConversa({ titulo: "A" });
    const b = await historico.criarConversa({ titulo: "B" });
    await historico.adicionarMensagem(a.id, { autor: "aluno", texto: "1" });
    await historico.adicionarMensagem(b.id, { autor: "aluno", texto: "2" });

    await historico.apagarConversa(a.id);
    expect(await historico.obterConversa(a.id)).toBeNull();
    expect((await historico.obterConversa(b.id)).mensagens).toHaveLength(1);
    // Nenhuma mensagem da conversa apagada fica escondida na base de dados
    expect((await registosGuardados("mensagens")).filter((m) => m.conversaId === a.id)).toEqual([]);
  });

  it("apagar o histórico remove as conversas mas mantém o perfil", async () => {
    await historico.atualizarPerfil({ ano: 7 });
    const conversa = await historico.criarConversa();
    await historico.adicionarMensagem(conversa.id, { autor: "aluno", texto: "Olá" });

    await historico.apagarHistorico();
    expect(await historico.listarConversas()).toEqual([]);
    expect(await registosGuardados("mensagens")).toEqual([]);
    expect((await historico.obterPerfil()).ano).toBe(7);
  });

  it("apagar tudo remove também o perfil", async () => {
    const perfil = await historico.atualizarPerfil({ ano: 9 });
    await historico.apagarTudo();
    const novo = await historico.obterPerfil();
    expect(novo.id).not.toBe(perfil.id);
    expect(novo.ano).toBeNull();
  });
});

describe("plano B em memória", () => {
  it("funciona quando o navegador não tem IndexedDB", async () => {
    const semIndexedDB = await abrirHistorico({ fabrica: null });
    expect(semIndexedDB.modo).toBe("memoria");
    const conversa = await semIndexedDB.criarConversa({ titulo: "Luz" });
    await semIndexedDB.adicionarMensagem(conversa.id, { autor: "aluno", texto: "O que é a luz?" });
    expect((await semIndexedDB.obterConversa(conversa.id)).mensagens).toHaveLength(1);
  });

  it("funciona quando o navegador bloqueia o IndexedDB", async () => {
    const bloqueado = {
      open() {
        throw new DOMException("Acesso negado", "SecurityError");
      },
    };
    const historicoBloqueado = await abrirHistorico({ fabrica: bloqueado });
    expect(historicoBloqueado.modo).toBe("memoria");
    await historicoBloqueado.criarConversa();
    expect(await historicoBloqueado.listarConversas()).toHaveLength(1);
  });
});

describe("estrutura igual à do futuro Supabase", () => {
  it("cada registo tem os campos previstos", async () => {
    const conversa = await historico.criarConversa({ titulo: "Forças" });
    const mensagem = await historico.adicionarMensagem(conversa.id, { autor: "aluno", texto: "O que é uma força?" });
    const perfil = await historico.obterPerfil();

    expect(Object.keys(perfil).sort()).toEqual(["alcunha", "ano", "criadoEm", "id"]);
    expect(Object.keys(conversa).sort()).toEqual(["atualizadaEm", "criadaEm", "id", "perfilId", "temaId", "titulo"]);
    expect(Object.keys(mensagem).sort()).toEqual(
      ["autor", "conversaId", "criadaEm", "id", "ordem", "seguintes", "situacao", "temaId", "texto", "tipo"].sort(),
    );
    expect(conversa.perfilId).toBe(perfil.id);
  });
});
