// serve the chat workload through web worker (not used)
import { ChatModule, ChatWorkerHandler } from '@mlc-ai/web-llm'

const chat = new ChatModule()
const handler = new ChatWorkerHandler(chat)
self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg)
}
