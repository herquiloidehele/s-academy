import { ISubscription, ISubscriptionRequest } from "@/app/business/subscription/SubscriptionData";
import Logger from "@/utils/Logger";
import CourseManager from "@/app/business/course/CourseManager";
import PaymentManager from "@/app/business/payment/PaymentManager";
import { PaymentMethods } from "@/app/business/payment/PaymentData";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";

class SubscriptionManager {
  private readonly LOG_TAG = "SubscriptionManager";

  public async subscribeCourse(subscriptionData: ISubscriptionRequest): Promise<void> {
    Logger.info(this.LOG_TAG, `Subscribing to course`, [subscriptionData]);

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
        expiresAt: subscriptionData.expiresAt,
        userId: subscriptionData.userId,
        createdAt: new Date(),
      };

      Logger.debug(this.LOG_TAG, `Subscription object`, [subscription]);

      await PaymentManager.payCourse({
        paymentMethod: PaymentMethods.MPESA,
        amount: totalAmount,
        phoneNumber: subscriptionData.phoneNUmber,
      });

      Logger.info(this.LOG_TAG, `Subscription Paid successfully`, [subscription]);
      await FirestoreService.saveDocument(FirebaseCollections.SUBSCRIPTIONS, subscription);

      Logger.info(this.LOG_TAG, `Subscription saved successfully`);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error subscribing to course`, error);
      return Promise.reject(error);
    }
  }
}

export default new SubscriptionManager();
