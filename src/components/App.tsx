import { ChatModule } from '@mlc-ai/web-llm'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { Square, Trash } from 'lucide-react'
import { type MouseEvent } from 'react'

import {
  activeModelIdAtom,
  configAtom,
  conversationAtom,
  generatingAtom,
  loadingAtom,
  runtimeStatsTextAtom
} from '../atoms'
import { type Message } from '../types'
import { Button } from './Button'
import { Header } from './Header'
import { MessageList } from './MessageList'
import { ModelSelect } from './ModelSelect'
import { PromptInput } from './PromptInput'
import { RuntimeStats } from './RuntimeStats'

type ProgressReport = { progress: number; text: string; timeElapsed: number }
type InitProgressCallback = (report: ProgressReport) => void
type GenerateCallback = (step: number, content: string) => void

interface AppProps {
  chat: ChatModule
}

export default function App({ chat }: AppProps) {
  const [generating, setGenerating] = useAtom(generatingAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [conversation, setConversation] = useAtom(conversationAtom)
  const setActiveModelId = useSetAtom(activeModelIdAtom)
  const setStatsText = useSetAtom(runtimeStatsTextAtom)
  const config = useAtomValue(configAtom)

  const trashDisabled = conversation.messages.length < 1
  const stopDisabled = loading || !generating

  const onGenerate: GenerateCallback = (_, content) => {
    setConversation(({ messages }) => ({
      messages,
      stream: { messageRole: 'assistant', content }
    }))
  }

  const handleResetClick = async () => {
    if (trashDisabled) return
    try {
      await chat.resetChat()
      setStatsText(RESET)
      setConversation(RESET)
    } catch (err) {
      setConversation(({ messages }) => ({
        messages: [
          ...messages,
          { messageRole: 'status', content: `Error: ${(err as Error).message}` }
        ],
        stream: null
      }))
      console.error(err)
    }
  }

  const handleReloadClick = async (
    _: MouseEvent<HTMLButtonElement>,
    modelId: string | null
  ) => {
    // load the selected model
    if (typeof modelId === 'string') {
      setLoading(true)

      try {
        await chat.resetChat()
        setConversation(RESET)

        await chat.reload(modelId, undefined, config)
        setConversation(({ stream }) => ({
          messages: [{ messageRole: 'status', content: (stream as Message).content }],
          stream: null
        }))
        setActiveModelId(modelId)
      } catch (err) {
        setConversation({
          messages: [
            { messageRole: 'status', content: `Error: ${(err as Error).message}` }
          ],
          stream: null
        })
        console.error(err)
      }

      setLoading(false)
      return
    }

    // unload the active model and reset the conversation
    if (modelId === null) {
      await chat.unload()
      setActiveModelId(RESET)
      setConversation(RESET)
    }
  }

  const handleInputButtonClick = async (
    _: MouseEvent<HTMLButtonElement>,
    prompt: string
  ) => {
    if (prompt) {
      setGenerating(true)

      // user message
      setConversation(({ messages }) => ({
        messages: [...messages, { messageRole: 'user', content: prompt }],
        stream: null
      }))

      // assistant message
      try {
        // the stop button causes the Promise to resolve
        // this is why `setConversation` gets called
        const message = await chat.generate(prompt, onGenerate)
        setConversation(({ messages }) => ({
          messages: [...messages, { messageRole: 'assistant', content: message }],
          stream: null
        }))
      } catch (err) {
        setConversation(({ messages }) => ({
          messages: [
            ...messages,
            { messageRole: 'status', content: `Error: ${(err as Error).message}` }
          ],
          stream: null
        }))
        console.error(err)
        return
      }

      setGenerating(false)

      // runtime stats
      try {
        const text = await chat.runtimeStatsText()
        setStatsText(text)
      } catch (err) {
        setConversation(({ messages }) => ({
          messages: [
            ...messages,
            { messageRole: 'status', content: `Error: ${(err as Error).message}` }
          ],
          stream: null
        }))
        console.error(err)
      }
    }
  }

  const handleStopClick = async () => {
    if (stopDisabled) return
    try {
      await chat.interruptGenerate()
    } catch (err) {
      console.error(err)
    }
  }

  const initProgress: InitProgressCallback = ({ text: content }) =>
    setConversation(({ messages }) => ({
      messages: messages,
      stream: { messageRole: 'status', content }
    }))
  chat.setInitProgressCallback(initProgress)

  // the height math is one way of ensuring we don't get outer scrollbars
  // message list is full viewport height minus header and footer
  // header and footer get fixed heights
  return (
    <div className="flex flex-col">
      <div className="grow">
        <Header className="h-[56px]" />

        <main className="flex flex-col grow">
          <div className="w-full max-w-screen-lg mx-auto">
            <MessageList
              // change `scroll` to `auto` if you don't like the scrollbars being always visible
              className="h-[calc(100vh_-_56px_-_192px)] overflow-y-scroll md:h-[calc(100vh_-_56px_-_160px)]"
            />
          </div>
        </main>
      </div>

      <footer className="h-[192px] bg-neutral-50 sticky bottom-0 border-t z-20 md:h-[160px]">
        {/* footer top row */}
        <div className="max-w-screen-lg mx-auto">
          <div className="p-4 flex flex-col justify-between md:border-x md:flex-row md:items-center">
            <RuntimeStats />
            <ModelSelect handleClick={handleReloadClick} />
          </div>
        </div>

        {/* footer bottom row */}
        <div className="max-w-screen-lg mx-auto">
          <div className="py-4 px-2 border-t md:border-x">
            <div className="flex items-center">
              <Button
                disabled={trashDisabled}
                label="Reset"
                icon={Trash}
                className="mr-2 p-2 text-lg"
                onClick={handleResetClick}
              />
              <div className="grow">
                <PromptInput handleClick={handleInputButtonClick} />
              </div>
              <Button
                disabled={stopDisabled}
                label="Stop"
                icon={Square}
                className="ml-2 p-2 text-lg"
                onClick={handleStopClick}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
