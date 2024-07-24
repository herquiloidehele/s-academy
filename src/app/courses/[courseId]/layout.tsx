import Header from "@/components/header/Header";
import React, { Suspense } from "react";
import AuthManager from "@/app/backend/business/auth/AuthManager";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import SubscriptionManager from "@/app/backend/business/subscription/SubscriptionManager";
import Logger from "@/utils/Logger";
import VideoSideListError from "@/components/course/video-side-list/VideoSideListError";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { ErrorBoundary } from "react-error-boundary";
import { IRouteParams } from "@/utils/interfaces";
import VideoListLoadingState from "@/components/course/video-side-list/VideoListLoadingState";

const LOG_TAG = "CourseLayout";

interface ICourseLayoutProps {
  children: React.ReactNode;
}
export default async function CourseLayout({ children, params: { courseId } }: ICourseLayoutProps & IRouteParams) {
  if (!courseId) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  const authUser = await AuthManager.getAuthUser();

  if (!authUser?.email) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  const hasSubscription = await SubscriptionManager.doesUserHaveActiveSubscription(authUser?.email);

  if (!hasSubscription) {
    Logger.debug(LOG_TAG, `User does not have active subscription`);
    return redirect(Constants.APP_ROUTES.CHECKOUT(courseId));
  }

  return (
    <div className={"pt-20 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto"}>
      <Header solidBg />
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
