import { ISubscription, ISubscriptionRequest } from "@/app/backend/business/subscription/SubscriptionData";
import Logger from "@/utils/Logger";
import CourseManager from "@/app/backend/business/course/CourseManager";
import PaymentManager from "@/app/backend/business/payment/PaymentManager";
import { PaymentMethods } from "@/app/backend/business/payment/PaymentData";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import dayjs from "dayjs";

class SubscriptionManager {
  private readonly LOG_TAG = "SubscriptionManager";

  public async subscribeCourse(subscriptionData: ISubscriptionRequest): Promise<boolean> {
    Logger.debug(this.LOG_TAG, `Subscribing to course`, [subscriptionData]);

    try {
      const user = await FirestoreService.getDocumentById(FirebaseCollections.USERS, subscriptionData.userId);

      if (!user) {
        Logger.error(this.LOG_TAG, `User not found by id: ${subscriptionData.userId}`);
        return Promise.reject("User not found");
      }

      const totalAmount = CourseManager.getTotalPrice(subscriptionData.course);

      const subscription: ISubscription = {
        courseId: subscriptionData.course.id,
        amountPaid: totalAmount,
        expiresAt: new Date(dayjs().add(1, "year").toDate()),
        userId: subscriptionData.userId,
        createdAt: new Date(),
      };

      Logger.debug(this.LOG_TAG, `Subscription object`, [subscription]);

      await PaymentManager.payCourse({
        paymentMethod: PaymentMethods.MPESA,
        amount: totalAmount,
        phoneNumber: subscriptionData.phoneNUmber,
      });

      Logger.debug(this.LOG_TAG, `Subscription Paid successfully`, [subscription]);
      await FirestoreService.saveDocument(FirebaseCollections.SUBSCRIPTIONS, subscription);

      Logger.debug(this.LOG_TAG, `Subscription saved successfully`);
      return true;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error subscribing to course`, error);
      return Promise.reject(error);
    }
  }

  public async getSubscriptionByUserId(userId: string): Promise<ISubscription | undefined> {
    Logger.debug(this.LOG_TAG, `Getting subscriptions for user: ${userId}`);

    try {
      const subscriptions = await FirestoreService.getDocumentsByQuery(FirebaseCollections.SUBSCRIPTIONS, {
        field: "userId",
        operator: "==",
        value: userId,
      });

      Logger.debug(this.LOG_TAG, `Subscriptions found`, [subscriptions]);

      if (!subscriptions?.length) {
        return undefined;
      }

      return subscriptions.pop() as ISubscription;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting subscriptions`, error);
      return Promise.reject(error);
    }
  }

  public async doesUserHaveActiveSubscription(userId?: string): Promise<boolean> {
    Logger.debug(this.LOG_TAG, `Checking if user has active subscription: ${userId}`);

    try {
      if (!userId) {
        Logger.error(this.LOG_TAG, `User not found`);
        return false;
      }

      const subscription = await this.getSubscriptionByUserId(userId);

      Logger.debug(this.LOG_TAG, `Subscription expire date`, [subscription]);
      const isActive = !!subscription;

      Logger.debug(this.LOG_TAG, `Active subscription found`, [isActive]);
      return isActive;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error checking active subscription`, error);
      return false;
    }
  }
}

export default new SubscriptionManager();
