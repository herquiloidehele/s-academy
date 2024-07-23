import { ISearchParams } from "@/utils/interfaces";
import CourseManager from "@/app/business/course/CourseManager";
import { getDefaultCourse } from "@/app/actions/course";

export default async function page({ searchParams: { lessonId, moduleOrder } }: ISearchParams) {
  const courseId = await getDefaultCourse();
  const lesson = await CourseManager.getLessonById(lessonId as string);
  const courseModule = await CourseManager.getModuleById(moduleOrder as string, courseId.id);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // await CourseManager.addLessonToModule(
  //   {
  //     id: lesson.id,
  //     title: lesson.title,
  //     videoRef: lesson.videoRef,
  //     thumbnailUrl: lesson.thumbnailUrl,
  //     order: lesson.order,
  //     description: lesson.description,
  //     duration: lesson.duration,
  //   },
  //   courseId.id,
  //   courseModule.id,
  // );

  return <div>Course registration page {lesson.title}</div>;
}
