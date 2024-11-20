import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "backend:3000", // Backend-serverns URL
        changeOrigin: true, // Ändrar "Origin"-headern till matcha målservern
        secure: false, // Ignorera HTTPS-certifikatproblem (om nödvändigt)
      },
    },
  },
});
