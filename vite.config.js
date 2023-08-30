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
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  }
})
