import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
export default defineConfig({
  base: "./",
  define: { "import.meta.env.VITE_PORTABLE": JSON.stringify("true") },
  plugins: [
    viteSingleFile(),
    {
      name: "portable-metadata",
      transformIndexHtml: (html) =>
        html.replace(/<link rel="manifest"[^>]+>/, ""),
    },
  ],
  build: { outDir: "portable", emptyOutDir: true },
  publicDir: false,
});
