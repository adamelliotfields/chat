import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'

import { type Conversation } from './types'

// the loaded model
export const activeModelIdAtom = atomWithReset<string | null>(null)

// the conversation (resettable)
export const conversationAtom = atomWithReset<Conversation>({
  messages: [],
  stream: null
})

// runtime stats text
export const runtimeStatsTextAtom = atomWithReset<string | null>(null)

// loading states
export const loadingAtom = atom<boolean>(false)
export const generatingAtom = atom<boolean>(false)
