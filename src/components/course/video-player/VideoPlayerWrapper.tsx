import VideoPlayer from "@/components/course/video-player/VideoPlayer";
import { ILesson } from "@/app/business/course/CourseData";

interface VideoPlayerWrapperProps {
  video: ILesson;
}
export function VideoPlayerWrapper(props: VideoPlayerWrapperProps) {
  return (
    <div className={"w-full flex flex-col gap-2 md:gap-4"}>
      <div className={"h-[40vh] md:h-[60vh]"}>
        <VideoPlayer videoId={props.video.videoRef} />
      </div>

      <div className={"flex flex-col gap-2"}>
        <h1 className={"font-bold text-md md-text-3xl text-black"}>{props.video.title}</h1>

        <div className={"bg-gray-200 min-h-20 p-5 rounded-xl"}>
          <p className={"text-gray-900 text-sm md:text-md"}>{props.video.description || "Sem Descrição"}</p>
        </div>
      </div>
    </div>
  );
}
