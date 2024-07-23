import { IRouteParams } from "@/utils/interfaces";
import CourseManager from "@/app/business/course/CourseManager";

export default async function page({ searchParams: { lessonId, moduleOrder } }: IRouteParams) {
  const lesson = await CourseManager.getLessonById(lessonId as string);

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
