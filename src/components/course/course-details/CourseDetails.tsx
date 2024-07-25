import { ICourse } from "@/app/backend/business/course/CourseData";
import Tabs, { ITabItem } from "@/components/shared/tabs/Tabs";
import CourseModules from "@/components/course/course-modules/CourseModules";
import { Suspense } from "react";
import CourseModulesLoadingState from "@/components/course/course-modules/CourseModulesLoadingState";
import { ErrorBoundary } from "react-error-boundary";
import CourseModulesErrorState from "@/components/course/course-modules/CourseModulesErrorState";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface ICourseDetailsProps {
  course: ICourse;
}
export default function CourseDetails(props: ICourseDetailsProps) {
  const tabItems: ITabItem[] = [
    {
      element: (
        <ErrorBoundary FallbackComponent={CourseModulesErrorState}>
          <Suspense fallback={<CourseModulesLoadingState />}>
            <CourseModules courseId={props.course.id} />
          </Suspense>
        </ErrorBoundary>
      ),
      value: "modules",
      title: "Módulos",
    },
    {
      element: (
        <div className={"space-y-3"}>
          <h2 className={"text-lg font-semibold"}>{props.course.title}</h2>
          <p className={"text-black/60 leading-7 text-sm"}>{props.course.description}</p>
        </div>
      ),
      value: "description",
      title: "Descrição",
    },
    {
      element: <div>Reviews</div>,
      value: "reviews",
      title: "Avaliações",
      icon: <LockClosedIcon className="w-4 h-4" />,
      disabled: true,
    },
  ];

  return (
    <div>
      <Tabs items={tabItems} />
    </div>
  );
}
