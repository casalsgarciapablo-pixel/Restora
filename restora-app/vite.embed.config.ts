import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import cssInjected from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";

/**
 * Compilación del puente para el panel: un único archivo IIFE con React y el CSS dentro, para que
 * landing.html solo tenga que cargar un script.
 * fileURLToPath y no new URL().pathname: en Windows ese pathname deja una barra delante ("/C:/…")
 * y el empaquetador no resuelve la entrada.
 */
const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), cssInjected()],
  resolve: { alias: { "@": src } },
  define: { "process.env.NODE_ENV": '"production"' },
  build: {
    outDir: "dist-embed",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/embed.tsx",
      name: "RestoraRevenueCard",
      formats: ["iife"],
      fileName: () => "restora-revenue-card.js",
    },
  },
});
