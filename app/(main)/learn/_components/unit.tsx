import { lessons, units } from '@/db/schema'

import { LessonButton } from './lesson-button'
import { UnitBanner } from './unit-banner'

interface UnitProps {
  id: number
  order: number
  description: string
  title: string
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean
  })[]
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
      })
    | undefined
  activeLessonPercentage: number
}

export function Unit({
  id,
  order,
  title,
  lessons,
  description,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id
          const isLocked = !lesson.completed && !isCurrent

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              locked={isLocked}
              current={isCurrent}
              totalCount={lessons.length - 1}
              percentage={activeLessonPercentage}
            />
          )
        })}
      </div>
    </>
  )
}
