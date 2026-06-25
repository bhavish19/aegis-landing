import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Broader mobile browser support (older Android WebViews, iOS 14+).
    target: ["es2018", "safari14", "chrome80"],
    cssTarget: "chrome80",
  },
});
