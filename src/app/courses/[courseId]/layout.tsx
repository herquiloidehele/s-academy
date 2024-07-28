import React, { Suspense } from "react";
import VideoSideListError from "@/components/course/video-side-list/VideoSideListError";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { ErrorBoundary } from "react-error-boundary";
import { IRouteParams } from "@/utils/interfaces";
import VideoListLoadingState from "@/components/course/video-side-list/VideoListLoadingState";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";

const LOG_TAG = "CourseLayout";

interface ICourseLayoutProps {
  children: React.ReactNode;
}
export default async function CourseLayout({ children, params: { courseId } }: ICourseLayoutProps & IRouteParams) {
  if (!courseId) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  return (
    <div className={"pt-20 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto"}>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-7">
          {children}
          <ErrorBoundary FallbackComponent={VideoSideListError}>
            <Suspense fallback={<VideoListLoadingState />}>
              <VideoSideList courseId={courseId} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
