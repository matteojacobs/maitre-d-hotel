import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base:"/maitre-d-hotel",
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
});
