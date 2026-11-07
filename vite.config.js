import { existsSync } from "node:fs";
import { defineConfig } from "vite";

// Duas páginas: a landing (/) e o chat (/chat/). O guia de estilo só existe na cópia local.
const input = { main: "index.html", chat: "chat/index.html" };
if (existsSync("guia-de-estilo.html")) input.guia = "guia-de-estilo.html";

export default defineConfig({
  // Caminhos relativos: o site funciona em qualquer endereço (Netlify ou outro)
  base: "./",
  build: {
    rollupOptions: { input },
  },
});
