import { existsSync } from "node:fs";
import { defineConfig } from "vite";

// O guia de estilo só existe na cópia local; a versão publicada tem apenas o chat.
const input = { main: "index.html" };
if (existsSync("guia-de-estilo.html")) input.guia = "guia-de-estilo.html";

export default defineConfig({
  // Caminhos relativos, para funcionar em https://<utilizador>.github.io/chat-newton/
  base: "./",
  build: {
    rollupOptions: { input },
  },
});
