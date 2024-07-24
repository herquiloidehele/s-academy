import { fetchCourses } from "@/app/backend/actions/course";
import { ICourse } from "@/app/backend/business/course/CourseData";
import CoursesList from "@/components/sections/courses-list/CoursesList";
import AwaitFetch from "@/components/shared/await-fetch/AwaitFetch";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorCourseListState from "@/components/sections/courses-list/ErrorCourseListState";
import CourseListLoadingState from "@/components/sections/courses-list/CourseListLoadingState";

export default function CourseListFetch() {
  const fetchCoursePromise = fetchCourses();

  return (
    <Suspense fallback={<CourseListLoadingState />}>
      <ErrorBoundary FallbackComponent={ErrorCourseListState}>
        <AwaitFetch promise={fetchCoursePromise}>
          {(courses: ICourse[]) => <CoursesList courses={courses} />}
        </AwaitFetch>
      </ErrorBoundary>
    </Suspense>
  );
}
