"use server";

import SubscriptionManager from "../business/subscription/SubscriptionManager";
import CourseManager from "../business/course/CourseManager";
import { ISubscriptionRequest } from "@/app/business/subscription/SubscriptionData";
import Logger from "@/utils/Logger";

const LOG_TAG = "SubscriptionActions";

export async function payCourseSubscription(phoneNumber: string, courseId: string, userId?: string) {
  Logger.info(LOG_TAG, `Paying course subscription for user: ${userId}`);

  try {
    if (!userId) {
      return Promise.reject("User not found");
    }

    const course = await CourseManager.getCourseById(courseId);

    if (!course) {
      return Promise.reject("Course not found");
    }

    const subscriptionData: ISubscriptionRequest = {
      course: course,
      userId,
      phoneNUmber: phoneNumber,
    };

    const response = await SubscriptionManager.subscribeCourse(subscriptionData);
    return { success: response };
  } catch (error) {
    return Promise.reject(error);
  }
}
