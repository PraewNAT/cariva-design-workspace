import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
const ds = import.meta.dirname;
const root = path.resolve(ds, "../products/mock-hosxp/prototypes/mock-hosxp-home");
export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(ds, "src"),
      "react": path.resolve(ds, "node_modules/react"),
      "react-dom": path.resolve(ds, "node_modules/react-dom"),
      "lucide-react": path.resolve(ds, "node_modules/lucide-react"),
      "@fontsource": path.resolve(ds, "node_modules/@fontsource"),
      "@material-symbols": path.resolve(ds, "node_modules/@material-symbols"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: { fs: { allow: [path.resolve(ds, "..")] } },
  build: { outDir: path.resolve(root, "dist"), emptyOutDir: true },
});
