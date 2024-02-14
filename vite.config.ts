import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 5120,
    target: 'esnext'
  },
  plugins: [
    react({
      plugins: [['@swc-jotai/react-refresh', {}]]
    })
  ]
})
