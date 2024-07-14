import Header from "@/components/header/Header";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { ISearchParams } from "@/utils/interfaces";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import CourseManager from "@/app/business/course/CourseManager";
import VideoError from "@/components/course/video-player/VideoError";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page({ searchParams: { w: lessonId } }: ISearchParams) {
  const sections = await CourseManager.getCourseSections(CourseManager.getDefaultCourse().id);

  if (!lessonId) {
    return redirect(`${Constants.APP_ROUTES.COURSE}/?w=${sections[0].lessons[0].videoRef}`);
  }

  return (
    <div className={"pt-20 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto"}>
      <Header solidBg />
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-7">
          <ErrorBoundary FallbackComponent={VideoError} key={lessonId as string}>
            <Suspense fallback={"Loading..."}>
              <VideoPlayerWrapper lessonId={lessonId as string} />
            </Suspense>
          </ErrorBoundary>
          <VideoSideList sections={sections} currentLesson={lessonId as string} />
        </div>
      </div>
    </div>
  );
}
