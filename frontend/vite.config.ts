import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import visualizer from "rollup-plugin-visualizer";

// import ManualChunksPlugin from 'rollup-plugin-manual-chunks';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    visualizer({
      open: true, // Automatically open the visualizer report in your browser
      filename: 'bundle-analysis.html', // Output file name
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "^/(login|logout|register|callback)": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
      "@server": path.resolve(import.meta.dir, "../server"),
    },
  }
});
