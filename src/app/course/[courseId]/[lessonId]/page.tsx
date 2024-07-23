import { IRouteParams } from "@/utils/interfaces";
import VideoError from "@/components/course/video-player/VideoError";
import React, { Suspense } from "react";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { ErrorBoundary } from "react-error-boundary";

export default function page({ params: { lessonId } }: IRouteParams) {
  return (
    <ErrorBoundary FallbackComponent={VideoError}>
      <Suspense fallback={"Loading..."}>
        <VideoPlayerWrapper lessonId={lessonId} />
      </Suspense>
    </ErrorBoundary>
  );
}
