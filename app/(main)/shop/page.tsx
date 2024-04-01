import Image from 'next/image'
import { redirect } from 'next/navigation'

import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { getUserProgress, getUserSubscription } from '@/db/queries'

import { UserProgress } from '../learn/_components/user-progress'
import { Items } from './_components/items'

export default async function ShopPage() {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ])

  if (!userProgress || !userProgress.activeCourse) redirect('/courses')

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-neutral-800m my-6 text-center text-2xl font-bold">
            Shop
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Gaste seus pontos com coisas legais.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  )
}
