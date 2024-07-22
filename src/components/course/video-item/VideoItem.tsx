import { ILesson } from "@/app/business/course/CourseData";
import Link from "next/link";
import { Constants } from "@/utils/Constants";
import Image from "next/image";
import { clsx } from "clsx";

interface VideoItemProps {
  video: ILesson;
  isPlaying?: boolean;
}
export default function VideoItem(props: VideoItemProps) {
  return (
    <Link className={"hover:bg-gray-100 w-full"} href={`${Constants.APP_ROUTES.COURSE}/?w=${props.video.id}`}>
      <div
        className={clsx("flex flex-col gap-2 w-full rounded-md", {
          "bg-gray-100": !props.isPlaying,
          "bg-green-100": props.isPlaying,
        })}
      >
        <div className={"w-full h-[120px] relative rounded-md overflow-hidden"}>
          <Image
            src={props.video.thumbnailUrl}
            alt={props.video.title}
            className={"w-full h-full rounded-md"}
            quality={100}
            objectFit={"cover"}
            fill={true}
          />

          <div
            className={clsx("absolute w-full h-full opacity-10", {
              "bg-black": !props.isPlaying,
              "bg-green-400": props.isPlaying,
            })}
          ></div>
        </div>

        <div className={"p-2"}>
          <span className="text-sm text-gray-400 mr-1">{props.video.duration}</span>
          <span className="text-sm font-medium truncate text-ellipsis overflow-hidden">{props.video.title}</span>
        </div>
      </div>
    </Link>
  );
}
