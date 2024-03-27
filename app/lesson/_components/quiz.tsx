'use client'

import { useState } from 'react'

import { challengeOptions, challenges } from '@/db/schema'

import { Header } from './header'

interface QuizProps {
  initialLessonId: number
  initialPercentage: number
  initialHearts: number
  initialLessonChallanges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription: any
}

export function Quiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallanges,
  userSubscription,
}: QuizProps) {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  )
}
