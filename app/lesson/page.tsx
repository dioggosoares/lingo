import { redirect } from 'next/navigation'

import { getLesson, getUserProgress } from '@/db/queries'

import { Quiz } from './_components/quiz'

export default async function Lesson() {
  const lessonData = getLesson()
  const userProgressData = getUserProgress()

  const [userProgress, lesson] = await Promise.all([
    userProgressData,
    lessonData,
  ])

  if (!lesson || !userProgress) redirect('/learn')

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallanges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={undefined}
    />
  )
}
