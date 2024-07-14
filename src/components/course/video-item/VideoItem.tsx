import { ILesson } from "@/app/business/course/CourseData";
import Link from "next/link";
import { Constants } from "@/utils/Constants";
import Image from "next/image";

interface VideoItemProps {
  video: ILesson;
}
export default function VideoItem(props: VideoItemProps) {
  return (
    <Link className={"hover:bg-gray-100  w-full"} href={`${Constants.APP_ROUTES.COURSE}/?w=${props.video.videoRef}`}>
      <div className={"flex flex-col gap-2 w-full"}>
        <Image
          src={`https://img.youtube.com/vi/${props.video.videoRef}/0.jpg`}
          alt={props.video.title}
          className={"w-full h-full rounded-md"}
          width={100}
          height={56}
        />

        <div className={""}>
          <span className="text-sm text-gray-500 mr-1">{props.video.duration}</span>
          <span className="text-sm font-medium truncate text-ellipsis overflow-hidden">{props.video.title}</span>
        </div>
      </div>
    </Link>
  );
}
