'use client'

import { courses, userProgress } from '@/db/schema'

import { CardCourse } from './card-course'

interface ListCoursesProps {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export function ListCourses({ activeCourseId, courses }: ListCoursesProps) {
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
            onCourse={() => {}}
            disabled={false}
            active={course.id === activeCourseId}
          ></CardCourse>
        )
      })}
    </div>
  )
}
