import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // rutas relativas: el build se copia dentro de netlify-dist/juegos/,
  // así los assets cargan bien sin importar el subpath.
  base: "./",
  server: {
    port: 5173,
  },
});
