import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Export Vite configuration
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@client": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@redux": "/src/redux",
      "@data": "/src/data",
      "@pages": "/src/pages",
      "@services": "/src/services",
    },
  },
});
