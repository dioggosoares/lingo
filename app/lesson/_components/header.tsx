import { InfinityIcon, X } from 'lucide-react'
import Image from 'next/image'

import { Progress } from '@/components/ui/progress'
import { useExitModal } from '@/store/use-exit-modal'

interface HeaderProps {
  hearts: number
  percentage: number
  hasActiveSubscription: boolean
}

export function Header({
  hearts,
  percentage,
  hasActiveSubscription,
}: HeaderProps) {
  const { open } = useExitModal()
  return (
    <div
      className="mx-auto flex w-full max-w-[71.25rem] items-center justify-between
      gap-x-7 px-10 pt-5 lg:pt-[3.125rem]"
    >
      <X
        onClick={open}
        className="cursor-pointer text-slate-500 transition hover:opacity-25"
      />
      <Progress value={percentage} />

      <div className="flex items-center font-bold text-rose-500">
        <Image
          src="/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 shrink-0 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </div>
  )
}
