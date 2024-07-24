"use client";

import { ILesson } from "@/app/backend/business/course/CourseData";
import Link from "next/link";
import { Constants } from "@/utils/Constants";
import Image from "next/image";
import { clsx } from "clsx";
import { useParams } from "next/navigation";

interface VideoItemProps {
  lesson: ILesson;
  moduleId: string;
  courseId: string;
}
export default function VideoItem(props: VideoItemProps) {
  const params = useParams();
  const selectedLessonId = params.lessonId as string;
  const isPlaying = selectedLessonId === props.lesson.id;

  return (
    <Link
      className={"hover:bg-gray-100 w-full"}
      href={Constants.APP_ROUTES.LESSON(props.courseId, props.moduleId, props.lesson.id)}
    >
      <div
        className={clsx("flex flex-col gap-2 w-full rounded-md", {
          "bg-gray-100": !isPlaying,
          "bg-green-100": isPlaying,
        })}
      >
        <div className={"w-full h-[180px] md:h-[135px] relative rounded-md overflow-hidden"}>
          <Image
            src={props.lesson.thumbnailUrl}
            alt={props.lesson.title}
            className={"w-full h-full rounded-md object-cover"}
            quality={100}
            objectFit={"cover"}
            fill={true}
          />

          <div
            className={clsx("absolute w-full h-full opacity-10", {
              "bg-black": !isPlaying,
              "bg-green-400": isPlaying,
            })}
          ></div>
        </div>

        <div className={"p-2"}>
          <span className="text-sm text-gray-400 mr-1">{props.lesson.duration}</span>
          <span className="text-sm font-medium truncate text-ellipsis overflow-hidden">{props.lesson.title}</span>
        </div>
      </div>
    </Link>
  );
}
