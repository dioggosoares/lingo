import Image from 'next/image'

import { challenges } from '@/db/schema'
import { cn } from '@/lib/utils'

interface CardChallengeProps {
  id: number
  text: string
  imageSrc: string | null
  audioSrc: string | null
  shortcut: string
  selected?: boolean
  onSelect: () => void
  status?: 'correct' | 'wrong' | 'none'
  disabled?: boolean
  type: (typeof challenges.$inferSelect)['type']
}

export function CardChallenge({
  id,
  text,
  type,
  status,
  audioSrc,
  imageSrc,
  shortcut,
  onSelect,
  disabled,
  selected,
}: CardChallengeProps) {
  return (
    <div
      onClick={() => {}}
      className={cn(
        `h-full cursor-pointer rounded-xl border-2 border-b-4 p-4
      hover:bg-black/5 active:border-b-2 lg:p-6`,
        selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
        selected &&
          status === 'correct' &&
          'border-green-300 bg-green-100 hover:bg-green-100',
        selected &&
          status === 'wrong' &&
          'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'w-full lg:p-3',
      )}
    >
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-20 w-full lg:max-h-[150px]">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
      <div
        className={cn(
          'flex items-center justify-between',
          type === 'ASSIST' && 'flex-row-reverse',
        )}
      >
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-sm text-neutral-600 lg:text-base',
            selected && 'text-sky-500',
            selected && status === 'correct' && 'text-green-500',
            selected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            `txt-neutral-400 flex h-5 w-5 items-center justify-center rounded-lg
            border-2 text-xs font-semibold lg:h-[1.875rem] lg:w-[1.875rem] lg:text-[.9375rem]`,
            selected && 'border-sky-500 text-sky-500',
            selected &&
              status === 'correct' &&
              'border-green-500 text-green-500',
            selected && status === 'wrong' && 'border-rose-500 text-rose-500',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  )
}
