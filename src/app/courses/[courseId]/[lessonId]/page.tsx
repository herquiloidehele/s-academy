import { IRouteParams } from "@/utils/interfaces";
import VideoError from "@/components/course/video-player/VideoError";
import React, { Suspense } from "react";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { ErrorBoundary } from "react-error-boundary";
import VideoLoadingState from "@/components/course/video-player/VideoLoadingState";

export default function page({ params: { lessonId } }: IRouteParams) {
  return (
    <div className={"w-full aspect-auto"}>
      <ErrorBoundary FallbackComponent={VideoError}>
        <Suspense fallback={<VideoLoadingState />}>
          <VideoPlayerWrapper lessonId={lessonId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
