import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // shadcn genera los componentes importándolos como "@/components/...", así que el alias tiene
    // que existir tanto aquí como en tsconfig o los archivos que instale no resolverán.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
