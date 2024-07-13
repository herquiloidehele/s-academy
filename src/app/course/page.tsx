import Header from "@/components/header/Header";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";

export default function Page() {
  return (
    <div className={"pt-16 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto"}>
      <Header solidBg />
      <div className="w-full">
        <div className="grid grid-cols-[4fr_1fr] gap-5">
          <VideoPlayerWrapper />
          <VideoSideList />
        </div>
      </div>
    </div>
  );
}
