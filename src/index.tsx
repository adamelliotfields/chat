import './index.css'

import { ChatModule } from '@mlc-ai/web-llm'
import { createRoot } from 'react-dom/client'

import App from './components/App'

const NODE_ENV = import.meta.env.DEV
  ? 'development'
  : import.meta.env.PROD
    ? 'production'
    : import.meta.env.MODE

// outside app so it doesn't new-up on re-renders
const chat = new ChatModule()

// debug mode
if (NODE_ENV !== 'production') {
  const { hasModelInCache } = await import('@mlc-ai/web-llm')
  const { default: config } = await import('./config.ts')
  // @ts-ignore
  window.chat = chat
  // @ts-ignore
  window.config = config
  // @ts-ignore
  window.hasModelInCache = hasModelInCache
  // @ts-ignore
  window.process = {
    env: { NODE_ENV }
  }
}

const container = window.document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(<App chat={chat} />)
}
