'use client'

import { boolean } from 'drizzle-orm/mysql-core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Confetti from 'react-confetti'
import { useAudio, useMount, useWindowSize } from 'react-use'
import { toast } from 'sonner'

import { upsertChallengeProgress } from '@/actions/challenge-progress'
import { reduceHearts } from '@/actions/user-progress'
import { challengeOptions, challenges, userSubscription } from '@/db/schema'
import { useHeartsModal } from '@/store/use-hearts-modal'
import { usePracticeModal } from '@/store/use-practice-modal'

import { Challenge } from './challenge'
import { Footer } from './footer'
import { Header } from './header'
import { QuestionBubble } from './question-bubble'
import { ResultCard } from './result-card'

interface QuizProps {
  initialLessonId: number
  initialPercentage: number
  initialHearts: number
  initialLessonChallanges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean
      })
    | null
}

export function Quiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallanges,
  userSubscription,
}: QuizProps) {
  const { open: openPracticeModal } = usePracticeModal()
  const { open: openHeartsModal } = useHeartsModal()

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal()
    }
  })

  const { width, height } = useWindowSize()
  const router = useRouter()

  const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' })
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/incorrect.wav',
  })
  const [finishAudio] = useAudio({
    src: '/finish.mp3',
    autoPlay: true,
  })

  const [pending, startTransition] = useTransition()
  const [lessonId] = useState(initialLessonId)
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
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
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal()
              return
            }

            correctControls.play()
            setStatus('correct')
            setPercentage((prev) => prev + 100 / challenges.length)

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5))
            }
          })
          .catch(() =>
            toast.error('Alguma coisa deu errado. Por favor tente outra vez'),
          )
      })
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              openHeartsModal()
              return
            }

            incorrectControls.play()
            setStatus('wrong')

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() =>
            toast.error('Alguma coisa deu errado. Por favor tente outra vez'),
          )
      })
    }
  }

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div
          className="mx-auto flex h-full max-w-lg flex-col items-center
          justify-center gap-y-4 text-center lg:gap-y-8"
        >
          <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl font-bold text-neutral-700 lg:text-3xl">
            Bom trabalho!!! <br /> Você concluiu a lição
          </h1>
          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push('/learn')}
        />
      </>
    )
  }

  const title =
    challenge.type === 'ASSIST'
      ? 'Selecione o significado correto'
      : challenge.question

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
