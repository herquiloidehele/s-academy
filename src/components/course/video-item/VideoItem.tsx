import { ICourseVideo } from "@/app/business/course/CourseData";
import Link from "next/link";
import { Constants } from "@/utils/Constants";
import Image from "next/image";

interface VideoItemProps {
  video: ICourseVideo;
}
export default function VideoItem(props: VideoItemProps) {
  const isActive = props.video.videoId === "BKFBxoU9vUk";

  return (
    <Link className={"hover:bg-gray-100  w-full"} href={`${Constants.APP_ROUTES.COURSE}/?w=${props.video.videoId}`}>
      <div className={"flex flex-col gap-2 w-full"}>
        <Image
          src={`https://img.youtube.com/vi/${props.video.videoId}/0.jpg`}
          alt={props.video.title}
          className={"w-full h-full rounded-md"}
          width={100}
          height={56}
        />

        <div className={""}>
          <span className="text-sm text-gray-500 mr-1">{props.video.duration}</span>
          <span className="text-sm font-medium">{props.video.title}</span>
        </div>
      </div>
    </Link>
  );
}
