import { ErrorBoundary } from "react-error-boundary";
import ErrorCourseListState from "@/components/sections/courses-list/ErrorCourseListState";
import { Suspense } from "react";
import CourseListLoadingState from "@/components/sections/courses-list/CourseListLoadingState";
import AwaitFetch from "@/components/shared/await-fetch/AwaitFetch";
import { ICourse } from "@/app/backend/business/course/CourseData";
import CoursesList from "@/components/sections/courses-list/CoursesList";
import { getSubscribedCourses } from "@/app/backend/actions/course";
import { CourseCardType } from "@/utils/Constants";

export const dynamic = "force-dynamic";

export default async function page() {
  const fetchCoursePromise = getSubscribedCourses();

  return (
    <div className={"py-20 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto space-y-5 w-full h-full"}>
      <h1 className={"text-2xl font-bold text-black/70"}>Meus cursos</h1>

      <section className="text-gray-600 body-font">
        <div className="container px-0 md:px-0 mx-auto">
          <ErrorBoundary FallbackComponent={ErrorCourseListState}>
            <Suspense fallback={<CourseListLoadingState />}>
              <AwaitFetch promise={fetchCoursePromise}>
                {(courses: ICourse[]) => <CoursesList courses={courses} cardType={CourseCardType.MY_COURSES} />}
              </AwaitFetch>
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
}
