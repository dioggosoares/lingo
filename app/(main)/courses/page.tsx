import { getCourses, getUserProgress } from '@/db/queries'

import { ListCourses } from './_components/list-courses'

export default async function Courses() {
  const coursesData = getCourses()
  const userProgressData = getUserProgress()

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ])

  return (
    <div className="mx-auto h-full max-w-[57rem] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Cursos de idiomas</h1>

      <ListCourses
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  )
}
