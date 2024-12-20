import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
  // build: {
  //   outDir: "../backend/dist",
  // },
});
