import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strict: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
