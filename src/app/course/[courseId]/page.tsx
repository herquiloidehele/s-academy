import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { IRouteParams } from "@/utils/interfaces";
import VideoError from "@/components/course/video-player/VideoError";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoLoadingState from "@/components/course/video-player/VideoLoadingState";

export default async function Page({ searchParams: { lessonId } }: IRouteParams) {
  return (
    <ErrorBoundary FallbackComponent={VideoError} key={lessonId as string}>
      <Suspense fallback={<VideoLoadingState />}>
        <VideoPlayerWrapper />
      </Suspense>
    </ErrorBoundary>
  );
}
