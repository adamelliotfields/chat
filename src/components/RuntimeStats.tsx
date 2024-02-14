import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { Gauge } from 'lucide-react'
import type { HTMLAttributes } from 'react'

import { runtimeStatsTextAtom } from '../atoms'

export interface RuntimeStatsProps extends HTMLAttributes<HTMLDivElement> {}

export function RuntimeStats({ className }: RuntimeStatsProps) {
  const statsText = useAtomValue(runtimeStatsTextAtom)
  const stats = parseRuntimeStatsText(statsText)

  const classNames = 'font-mono text-sm leading-none tracking-wide uppercase md:pl-4'

  return (
    // runtime stats
    <div className={clsx('flex flex-wrap items-center gap-x-4 md:divide-x', className)}>
      <div className="-mt-1 text-lg leading-none text-neutral-400 md:mt-0">
        <Gauge size="1em" />
      </div>
      {/* prefilling stats */}
      <div className={classNames}>
        <span className="text-neutral-900">{stats.prefill}</span>
        <span className="text-neutral-400">&nbsp;tokens/sec prefill</span>
      </div>
      {/* decoding stats */}
      <div className={classNames}>
        <span className="text-neutral-900">{stats.decode}</span>
        <span className="text-neutral-400">&nbsp;tokens/sec decode</span>
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
