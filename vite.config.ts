import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 5120
  },
  plugins: [
    react({
      plugins: [['@swc-jotai/react-refresh', {}]]
    })
  ]
})
