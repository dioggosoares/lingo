'use client'

import { useState } from 'react'

import { challengeOptions, challenges } from '@/db/schema'

import { Challenge } from './challenge'
import { Footer } from './footer'
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
  const [selectedOption, setSelectedOption] = useState<number | undefined>()
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none')

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  function onNext() {
    setActiveIndex((current) => current + 1)
  }

  function onSelect(id: number) {
    if (status !== 'none') return

    setSelectedOption(id)
  }

  function onContinue() {
    if (!selectedOption) return

    if (status === 'correct') {
      onNext()
      setStatus('none')
      setSelectedOption(undefined)
      return
    }

    if (status === 'wrong') {
      setStatus('none')
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find((option) => option.correct)

    if (correctOption && correctOption.id === selectedOption) {
      console.log('correto')
    } else {
      console.error('incorreto')
    }
  }

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
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer disabled={!selectedOption} status={status} onCheck={onContinue} />
    </>
  )
}
