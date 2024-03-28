import { challengeOptions, challenges } from '@/db/schema'
import { cn } from '@/lib/utils'

import { CardChallenge } from './card-challenge'

interface ChallengeProps {
  options: (typeof challengeOptions.$inferSelect)[]
  onSelect: (id: number) => void
  status: 'correct' | 'wrong' | 'none'
  selectedOption?: number
  disabled?: boolean
  type: (typeof challenges.$inferSelect)['type']
}

export function Challenge({
  type,
  status,
  options,
  onSelect,
  disabled,
  selectedOption,
}: ChallengeProps) {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' &&
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, i) => {
        return (
          <CardChallenge
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onSelect={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
          />
        )
      })}
    </div>
  )
}
