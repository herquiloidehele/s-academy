import VideoPlayer from "@/components/course/video-player/VideoPlayer";
import CourseManager from "@/app/backend/business/course/CourseManager";

interface VideoPlayerWrapperProps {
  lessonId?: string;
  courseId?: string;
  moduleId?: string;
}
export async function VideoPlayerWrapper(props: VideoPlayerWrapperProps) {
  if (!props.lessonId || !props.courseId || !props.moduleId) {
    return <EmptyVideoPlayer />;
  }

  const lesson = await CourseManager.getLessonById(props.courseId, props.moduleId, props.lessonId);

  return (
    <div className={"w-full flex flex-col gap-2 md:gap-4"}>
      <div className={"bg-muted rounded-xl"}>
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

const EmptyVideoPlayer = () => {
  return (
    <div className={"flex gap-3 flex-col justify-center items-center bg-gray-800 rounded-2xl h-[60vh]"}>
      <h1 className={"text-2xl text-white"}>Selecione uma aula para começar a assistir</h1>
      <p className={"text-white text-md max-w-[360px] text-center"}>
        Comece a assistir as aulas do curso selecionando uma aula na lista ao lado.
      </p>
    </div>
  );
};
