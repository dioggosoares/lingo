import { InfinityIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface UserProgressProps {
  activeCourse: { imageSrc: string; title: string } // TODO: Replace with DB types
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export function UserProgress({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: UserProgressProps) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Link>
      </Button>

      <Button variant="ghost" className="text-orange-500" asChild>
        <Link href="/shop">
          <Image
            src="/points.svg"
            alt="Points"
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Link>
      </Button>

      <Button variant="ghost" className="text-rose-500" asChild>
        <Link href="/shop">
          <Image
            src="/heart.svg"
            alt="Hearts"
            className="mr-2"
            width={22}
            height={22}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  )
}
