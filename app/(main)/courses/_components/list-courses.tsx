'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { upsertUserProgress } from '@/actions/user-progress'
import { courses, userProgress } from '@/db/schema'

import { CardCourse } from './card-course'

interface ListCoursesProps {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export function ListCourses({ activeCourseId, courses }: ListCoursesProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleActiveCourse(id: number) {
    if (pending) return

    if (id === activeCourseId) {
      return router.push('/learn')
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('Algo deu errado!'))
    })
  }

  return (
    <div
      className="grid grid-cols-1 gap-4
      pt-6 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(13.125rem,1fr))]"
    >
      {courses.map((course) => {
        return (
          <CardCourse
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            onActiveCourse={handleActiveCourse}
            disabled={false}
            active={course.id === activeCourseId}
          ></CardCourse>
        )
      })}
    </div>
  )
}
