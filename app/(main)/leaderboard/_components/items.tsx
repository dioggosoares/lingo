'use client'

import Image from 'next/image'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { refillHearts } from '@/actions/user-progress'
import { createStripeUrl } from '@/actions/user-subscription'
import { Button } from '@/components/ui/button'
import { POINTS_TO_REFILL } from '@/constants'

interface ItemsProps {
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export function Items({ hearts, points, hasActiveSubscription }: ItemsProps) {
  const [pending, startTransition] = useTransition()

  function onRefillHearts() {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return

    startTransition(() => {
      refillHearts().catch(() => toast.error('Algo deu errado!'))
    })
  }

  function onUpgrade() {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error('Algo deu errado!'))
    })
  }

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Comprar corações
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            'cheio'
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Corações ilimitados
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? 'configurações' : 'upgrade'}
        </Button>
      </div>
    </ul>
  )
}
