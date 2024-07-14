import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import CourseManager from "@/app/business/course/CourseManager";
import { formatCurrency } from "@/lib/utils";
import PaymentManager from "@/app/business/payment/PaymentManager";
import { PaymentMethods } from "@/app/business/payment/PaymentData";

export default function ProductCard() {
  const course = CourseManager.getDefaultCourse();

  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <BookmarkIcon className="w-6 h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-xl text-blue-950"}>Informação do curso</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-3"}>
          <div className={"flex justify-between gap-5"}>
            <span>{course.title}</span>
            <span className={"font-normal"}>{formatCurrency(course.price)}</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span>Desconto</span>
            <span className={"font-normal"}>{formatCurrency(-course.discount)}</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span>Taxa Mpesa (3%)</span>
            <span className={"font-normal"}>
              {formatCurrency(PaymentManager.getFeeAmount(CourseManager.getTotalPrice(course), PaymentMethods.MPESA))}
            </span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span className={"font-bold text-lg text-green-400"}>Total</span>
            <span className={"font-bold text-lg text-green-400"}>
              {formatCurrency(
                PaymentManager.getAmountWithFee(CourseManager.getTotalPrice(course), PaymentMethods.MPESA),
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
