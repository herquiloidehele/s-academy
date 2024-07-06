import { ICourse } from "@/app/business/course/CourseData";

export interface ISubscription {
  id?: string;
  courseId: string;
  userId: string;
  createdAt: Date;
  expiresAt?: Date;
  amountPaid: number;
}

export interface ISubscriptionRequest {
  course: ICourse;
  userId: string;
  expiresAt?: Date;
  phoneNUmber: string;
}
