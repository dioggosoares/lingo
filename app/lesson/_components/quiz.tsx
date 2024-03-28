'use client'

import { useState } from 'react'

import { challengeOptions, challenges } from '@/db/schema'

import { Challenge } from './challenge'
import { Header } from './header'
import { QuestionBubble } from './question-bubble'

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
  const [challenges] = useState(initialLessonChallanges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    )
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const title =
    challenge.type === 'ASSIST'
      ? 'Selecione o significado correto'
      : challenge.question

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div
            className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[21.875rem]
            lg:w-[37.5rem] lg:px-0"
          >
            <h1
              className="text-center text-lg font-bold text-neutral-700
              lg:text-start lg:text-3xl"
            >
              {title}
            </h1>
            <div>
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={() => {}}
                status="none"
                selectedOption={undefined}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
