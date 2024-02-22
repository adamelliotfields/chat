import react from '@vitejs/plugin-react-swc'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/chat/' : '/',
  build: {
    chunkSizeWarningLimit: 5120,
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@mlc-ai/web-llm')) return 'web-llm'
        }
      }
    }
  },
  plugins: [
    react({
      plugins: [['@swc-jotai/react-refresh', {}]]
    }),
    splitVendorChunkPlugin()
  ]
}))
