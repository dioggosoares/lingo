import { X } from 'lucide-react'

import { Progress } from '@/components/ui/progress'

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
  return (
    <div
      className="mx-auto flex w-full max-w-[71.25rem] items-center justify-between
      gap-x-7 px-10 pt-5 lg:pt-[3.125rem]"
    >
      <X
        onClick={() => {}}
        className="cursor-pointer text-slate-500 transition hover:opacity-25"
      />
      <Progress value={percentage} />
    </div>
  )
}
