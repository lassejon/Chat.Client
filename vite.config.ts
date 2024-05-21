import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:44330',
        changeOrigin: true,
        secure: false,
        agent: https.Agent(),
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/chat': {
        target: 'https://localhost:44330',
        // changeOrigin: true,
        secure: false,
        agent: https.Agent(),
      }
    }
  }
})
