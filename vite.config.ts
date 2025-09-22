import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // Use relative asset paths so the site works under subpaths (e.g., /spoolku/)
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // --- tady přidáváme multi-page vstupy ---
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        members: path.resolve(__dirname, 'members.html'),
      }
    }
  }
}));
