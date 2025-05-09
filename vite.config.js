import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/api': 'http://192.168.29.236:4000'
    },
    host: '0.0.0.0',
    port: 5175,
  },
})
