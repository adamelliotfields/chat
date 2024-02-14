export const TITLE = 'CHAT' as const

export const HREF = import.meta.env.DEV
  ? 'http://localhost:5173'
  : 'https://aef.me/chat/'
