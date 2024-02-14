import Shiki from '@shikijs/markdown-it'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import MarkdownIt from 'markdown-it'
import type { HTMLAttributes } from 'react'

import { conversationAtom } from '../atoms'
import type { Message as IMessage } from '../types'

// can't use `react-markdown` with shiki or rehype-pretty until remarkjs/react-markdown#680
// (markdown-it is awesome; I'm just depending on `dangerouslySetInnerHTML` to use it)
const md = MarkdownIt()
md.use(
  await Shiki({
    themes: {
      light: 'github-light',
      dark: 'github-dark'
    }
  })
)

export interface MessageProps extends IMessage {
  markdown?: boolean
}

export function Message({ content, markdown = false, messageRole }: MessageProps) {
  return (
    <div className="p-4 md:p-8">
      <div
        className={clsx('w-full flex flex-col md:flex-row', {
          'justify-start': ['assistant', 'status'].includes(messageRole),
          'justify-end': messageRole === 'user'
        })}
      >
        {/* message bubble */}
        <div className="max-w-full border px-4 py-2 rounded-lg break-words [word-break:break-word] shadow-sm bg-white">
          <div className="mt-1 text-xs text-neutral-400 font-bold tracking-tight uppercase">
            {messageRole}
          </div>
          <div
            // biome-ignore lint: security/noDangerouslySetInnerHtml
            dangerouslySetInnerHTML={{
              __html: markdown ? md.render(content ?? '') : content ?? ''
            }}
            className="mt-2 mb-0.5 prose min-w-0"
          />
        </div>
      </div>
    </div>
  )
}

export interface MessageListProps extends HTMLAttributes<HTMLDivElement> {}

export function MessageList({ className, ...rest }: MessageListProps) {
  const conversation = useAtomValue(conversationAtom)
  const { messages, stream } = conversation

  return (
    <div className={clsx('md:border-x', className)} {...rest}>
      {messages.map((message, i) => (
        // render markdown after stream finishes
        <Message
          key={`message-${i}`}
          messageRole={message.messageRole}
          content={message.content}
          markdown
        />
      ))}
      {stream !== null && (
        <Message messageRole={stream.messageRole} content={stream.content} />
      )}
    </div>
  )
}
