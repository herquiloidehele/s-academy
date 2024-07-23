import Header from "@/components/header/Header";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { IRouteParams } from "@/utils/interfaces";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";
import CourseManager from "@/app/business/course/CourseManager";
import VideoError from "@/components/course/video-player/VideoError";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SubscriptionManager from "@/app/business/subscription/SubscriptionManager";
import Logger from "@/utils/Logger";
import AuthManager from "@/app/business/auth/AuthManager";

const LOG_TAG = "CoursePage";

export default async function Page({ searchParams: { lessonId }, params: { courseId } }: IRouteParams) {
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
    return redirect(Constants.APP_ROUTES.CHECKOUT);
  }

  const courseModules = await CourseManager.getCourseModules(courseId as string);

  const defaultLessons = await CourseManager.getLessons(courseId, courseModules[0].id);

  if (!lessonId) {
    return redirect(
      `${Constants.APP_ROUTES.COURSE_DETAILS.replace("{courseId}", courseId)}/?lessonId=${defaultLessons[0]?.id}`,
    );
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
          <VideoSideList modules={courseModules} currentLesson={lessonId as string} courseId={courseId} />
        </div>
      </div>
    </div>
  );
}
