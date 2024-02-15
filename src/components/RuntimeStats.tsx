import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import type { HTMLAttributes } from 'react'

import { runtimeStatsTextAtom } from '../atoms'

export interface RuntimeStatsProps extends HTMLAttributes<HTMLDivElement> {}

export function RuntimeStats({ className }: RuntimeStatsProps) {
  const statsText = useAtomValue(runtimeStatsTextAtom)
  const stats = parseRuntimeStatsText(statsText)

  const classNames = 'font-mono text-base leading-none tracking-wide uppercase md:pl-4'

  return (
    // runtime stats
    <div className={clsx('ml-1 flex items-center md:ml-5', className)}>
      {/* prefilling stats */}
      <div className={classNames}>
        <span className="text-neutral-900">{stats.prefill} tokens/sec</span>
        <span className="text-neutral-400">{' prefilling'}</span>
      </div>
      {/* decoding stats */}
      <div className={clsx('ml-4 md:ml-0', classNames)}>
        <span className="text-neutral-900">{stats.decode} tokens/sec</span>
        <span className="text-neutral-400">{' decoding'}</span>
      </div>
    </div>
  )
}

// https://github.com/mlc-ai/web-llm/blob/main/src/llm_chat.ts
function parseRuntimeStatsText(text: string | null) {
  if (!text) return { prefill: '0.00', decode: '0.00' }
  const [prefillTxt, decodeTxt] = text.split(', ')
  const prefill = parseFloat(prefillTxt.split(' ')[1]).toFixed(2)
  const decode = parseFloat(decodeTxt.split(' ')[1]).toFixed(2)
  return { prefill, decode }
}
