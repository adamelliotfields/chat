import clsx from 'clsx'
import { SendHorizontal } from 'lucide-react'
import { type ChangeEvent, type HTMLAttributes, type MouseEvent, useState } from 'react'

import { Button } from './Button'

export interface PromptInputProps extends HTMLAttributes<HTMLDivElement> {
  activeModelId?: string | null
  handleClick: (
    event: MouseEvent<HTMLButtonElement>,
    content: string
  ) => Promise<void> | void
}

export function PromptInput({
  activeModelId = null,
  className,
  handleClick,
  ...rest
}: PromptInputProps) {
  const [value, setValue] = useState<string>('')
  const buttonDisabled = value.length < 1
  const inputDisabled = activeModelId === null
  const placeholder = inputDisabled ? 'Load a model...' : 'Ask anything...'

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)

  const handleClickWithValue = (e: MouseEvent<HTMLButtonElement>) => {
    if (buttonDisabled) return
    handleClick(e, value)
    setValue('')
  }

  return (
    <div
      className={clsx(
        'p-2 flex items-center w-full rounded-md bg-white outline-none border border-neutral-200 placeholder-neutral-400',
        'focus:outline-none focus:ring-1',
        className
      )}
      {...rest}
    >
      <textarea
        className={clsx(
          'h-10 flex-grow flex-shrink p-2 overflow-auto outline-none w-full font-sans resize-none caret-cyan-500 bg-white text-neutral-900 border-0',
          'focus:ring-0 placeholder:text-neutral-400/50',
          inputDisabled && 'cursor-not-allowed'
        )}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={inputDisabled}
      />
      <div className="flex items-center justify-self-end bg-white rounded-full space-x-2">
        <Button
          className="text-lg"
          label="Send"
          icon={SendHorizontal}
          onClick={handleClickWithValue}
          disabled={buttonDisabled}
        />
      </div>
    </div>
  )
}
