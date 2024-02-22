import './index.css'

import { ChatModule, hasModelInCache } from '@mlc-ai/web-llm'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import config from './config'

const chat = new ChatModule()

const NODE_ENV = import.meta.env.DEV
  ? 'development'
  : import.meta.env.PROD
    ? 'production'
    : import.meta.env.MODE

// debug mode
if (NODE_ENV !== 'production') {
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
  root.render(
    <StrictMode>
      <App chat={chat} config={config} />
    </StrictMode>
  )
}
