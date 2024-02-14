export type MessageRole = 'assistant' | 'user' | 'status'

export interface Message {
  messageRole: MessageRole
  content: string | null
}

export interface Conversation {
  messages: Message[]
  stream: Message | null
}
