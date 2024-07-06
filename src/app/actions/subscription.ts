"use server";

import SubscriptionManager from "@/app/business/subscription/SubscriptionManager";
import CourseManager from "@/app/business/course/CourseManager";
import { ISubscriptionRequest } from "@/app/business/subscription/SubscriptionData";
import Logger from "@/utils/Logger";

const LOG_TAG = "SubscriptionActions";

export async function payCourseSubscription(phoneNumber: string, userId?: string) {
  Logger.info(LOG_TAG, `Paying course subscription for user: ${userId}`);

  try {
    if (!userId) {
      return Promise.reject("User not found");
    }

    const subscriptionData: ISubscriptionRequest = {
      course: CourseManager.getDefaultCourse(),
      userId,
      phoneNUmber: phoneNumber,
    };

    await SubscriptionManager.subscribeCourse(subscriptionData);
    return { success: true };
  } catch (error) {
    return Promise.reject(error);
  }
}
