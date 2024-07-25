import { ICourse } from "@/app/backend/business/course/CourseData";
import VideoPlayer from "@/components/course/video-player/VideoPlayer";
import Image from "next/image";
import { Constants } from "@/utils/Constants";

interface ICourseThumbnailProps {
  course: ICourse;
}
export default function CourseThumbnail(props: ICourseThumbnailProps) {
  return (
    <div className={"w-100 h-100 aspect-video overflow-hidden relative"}>
      {props.course.promoVideoRef ? (
        <VideoPlayer videoId={props.course.promoVideoRef} autoplay={false} />
      ) : (
        <Image
          fill
          className={"w-100 h-100 accent-yellow-100 rounded-xl shadow-xl border-2 border-gray-100 "}
          src={props.course.coverUrl || Constants.UI.FALLBACK_IMAGES.COURSE_ENTRY}
          alt={props.course.title}
          objectFit={"cover"}
        />
      )}
    </div>
  );
}
