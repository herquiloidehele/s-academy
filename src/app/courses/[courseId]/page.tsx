import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import VideoError from "@/components/course/video-player/VideoError";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import VideoLoadingState from "@/components/course/video-player/VideoLoadingState";

export default async function Page() {
  return (
    <ErrorBoundary FallbackComponent={VideoError}>
      <Suspense fallback={<VideoLoadingState />}>
        <VideoPlayerWrapper />
      </Suspense>
    </ErrorBoundary>
  );
}
