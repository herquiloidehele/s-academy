import { IRouteParams } from "@/utils/interfaces";
import Header from "@/components/header/Header";
import CourseManager from "@/app/backend/business/course/CourseManager";
import CourseInfo from "@/components/course/course-info/CourseInfo";
import CourseThumbnail from "@/components/course/course-thumbnail/CourseThumbnail";
import CourseDetails from "@/components/course/course-details/CourseDetails";

export default async function page({ params: { courseId } }: IRouteParams) {
  if (!courseId) {
    return null;
  }

  const course = await CourseManager.getCourseById(courseId);

  if (!course) {
    return null;
  }

  return (
    <div className="px-4 xl:px-0 my-24 lg:mt-28 max-w-[1300px] mx-auto">
      <Header solidBg />

      <div className={"grid grid-cols-1 lg:grid-cols-[3fr,_1fr] gap-6"}>
        <div className={"flex flex-col gap-y-3 justify-start"}>
          <h1 className={"text-black/70 text-xl lg:text-3xl text-left font-bold uppercase"}>{course.title}</h1>

          <CourseThumbnail course={course} />

          <CourseDetails course={course} />
        </div>

        <div>
          <CourseInfo course={course} totalLessons={10} totalModules={5} />
        </div>
      </div>
    </div>
  );
}