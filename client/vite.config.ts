import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDevelopment = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: isDevelopment
      ? {
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
          }
        }
      : undefined
  }
})
