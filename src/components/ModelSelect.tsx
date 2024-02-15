import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { Power } from 'lucide-react'
import { type ChangeEvent, type HTMLAttributes, type MouseEvent, useState } from 'react'
import { activeModelIdAtom, configAtom, loadingAtom } from '../atoms'
import { Button } from './Button'

export interface ModelSelectProps extends HTMLAttributes<HTMLDivElement> {
  handleClick: (
    event: MouseEvent<HTMLButtonElement>,
    content: string | null
  ) => Promise<void> | void
}

// TODO: check if device has enough storage buffer like in the example and only enable models with `low_resource_required`
// https://github.com/mlc-ai/web-llm/blob/main/examples/simple-chat/src/simple_chat.ts
export function ModelSelect({ className, handleClick, ...rest }: ModelSelectProps) {
  const config = useAtomValue(configAtom)
  const activeModelId = useAtomValue(activeModelIdAtom)
  const loading = useAtomValue(loadingAtom)

  const modelList = config.model_list
  const [selectedModelId, setSelectedModelId] = useState<string>(modelList[0].local_id)

  const handleModelSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const model = modelList.find((model) => model.local_id === e.target.value)
    if (model) {
      setSelectedModelId(model.local_id)
    }
  }

  const handleClickWithModel = async (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) return

    // unload the active model
    if (activeModelId) {
      return await handleClick(e, null)
    }

    // load the selected model
    if (!activeModelId && selectedModelId) {
      await handleClick(e, selectedModelId)
    }
  }

  return (
    <div className={clsx('flex items-center md:pl-4', className)} {...rest}>
      <label htmlFor="model" className="sr-only">
        Model
      </label>
      {/* TODO: disabled model styles */}
      <select
        id="model"
        name="model"
        className={clsx(
          'w-full rounded-md border-0 mt-3 py-1.5 pl-3 ring-1 ring-inset ring-neutral-200',
          'focus:ring-2 focus:ring-cyan-500',
          'md:mt-0'
        )}
        value={selectedModelId ?? ''}
        onChange={handleModelSelectChange}
      >
        {modelList.map((model) => (
          <option key={model.local_id} value={model.local_id}>
            {model.local_id}
          </option>
        ))}
      </select>
      <Button
        disabled={loading}
        active={activeModelId === selectedModelId}
        className="-mr-0.5 ml-3 p-1 text-base"
        icon={Power}
        label="Reload"
        onClick={handleClickWithModel}
      />
    </div>
  )
}
