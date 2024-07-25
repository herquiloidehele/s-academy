import { fetchCourses } from "@/app/backend/actions/course";
import { Suspense } from "react";
import CourseListLoadingState from "@/components/sections/courses-list/CourseListLoadingState";
import { ErrorBoundary } from "react-error-boundary";
import ErrorCourseListState from "@/components/sections/courses-list/ErrorCourseListState";
import AwaitFetch from "@/components/shared/await-fetch/AwaitFetch";
import { ICourse } from "@/app/backend/business/course/CourseData";
import CoursesList from "@/components/sections/courses-list/CoursesList";
import { Constants } from "@/utils/Constants";

export default async function CourseListFetch() {
  const fetchCoursePromise = fetchCourses();

  return (
    <div
      className={"w-full py-14 px-4 lg:px-6 lg:py-24 bg-[rgba(217,255,229,15%)] relative scroll-mt-20"}
      id={Constants.UI.SECTIONS.COURSES}
    >
      <div className={"max-w-[1300px] mx-auto "}>
        <div>
          <h2 className={"text-2xl md:text-4xl font-bold flex justify-center gap-2 items-center"}>
            <span className={"text-black"}>Principais</span>
            <span className={"text-green-400"}> Cursos</span>
          </h2>

          <section className="text-gray-600 body-font">
            <div className="container px-0 md:px-0 py-8 md:py-16 mx-auto">
              <Suspense fallback={<CourseListLoadingState />}>
                <ErrorBoundary FallbackComponent={ErrorCourseListState}>
                  <AwaitFetch promise={fetchCoursePromise}>
                    {(courses: ICourse[]) => <CoursesList courses={courses} />}
                  </AwaitFetch>
                </ErrorBoundary>
              </Suspense>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
