import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    chunkSizeWarningLimit: 1080, // 1024 KB = 1 MB
  },
  server: {
    port: 80
  }
})
