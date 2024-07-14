import VideoPlayer from "@/components/course/video-player/VideoPlayer";
import CourseManager from "@/app/business/course/CourseManager";

interface VideoPlayerWrapperProps {
  lessonId?: string;
}
export async function VideoPlayerWrapper(props: VideoPlayerWrapperProps) {
  if (!props.lessonId) {
    throw new Error("Lesson ID is required");
  }

  const lesson = await CourseManager.getLessonById(props.lessonId);

  return (
    <div className={"w-full flex flex-col gap-2 md:gap-4"}>
      <div className={"h-[40vh] md:h-[60vh]"}>
        <VideoPlayer videoId={lesson.videoRef} />
      </div>

      <div className={"flex flex-col gap-2"}>
        <h1 className={"font-bold text-md md-text-3xl text-black"}>{lesson.title}</h1>

        <div className={"bg-gray-200 min-h-20 p-5 rounded-xl"}>
          <p className={"text-gray-900 text-sm md:text-md"}>{lesson.description || "Sem Descrição"}</p>
        </div>
      </div>
    </div>
  );
}
