import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from "@vitejs/plugin-react-refresh";
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  root: "./src",
  plugins: [react(), reactRefresh(), splitVendorChunkPlugin()],
})
