import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
  // build: {
  //   outDir: "../backend/dist",
  // },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),   // 秘密鍵
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),  // 証明書
    },
  },
});
