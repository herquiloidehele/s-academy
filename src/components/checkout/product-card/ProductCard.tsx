import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import CourseManager from "@/app/business/course/CourseManager";
import { formatCurrency } from "@/lib/utils";
import PaymentManager from "@/app/business/payment/PaymentManager";
import { PaymentMethods } from "@/app/business/payment/PaymentData";
import { ICourse } from "@/app/business/course/CourseData";

interface IProductCardProps {
  course: ICourse;
}
export default function ProductCard({ course }: IProductCardProps) {
  const labelClass = "text-sm lg:text-md";
  const valueClass = "text-sm lg:text-md";

  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <BookmarkIcon className="w-4 h-4 lg:w-6 lg:h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-blue-950"}>Informação do curso</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={"flex flex-col gap-3"}>
          <div className={"flex justify-between gap-5"}>
            <span className={labelClass}>{course.title}</span>
            <span className={valueClass}>{formatCurrency(course.price)}</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span className={labelClass}>Taxa Mpesa (3%)</span>
            <span className={valueClass}>
              {formatCurrency(PaymentManager.getFeeAmount(CourseManager.getTotalPrice(course), PaymentMethods.MPESA))}
            </span>
          </div>

          <div className={"flex justify-between gap-5 text-red-400"}>
            <span className={labelClass}>Desconto (Somente hoje)</span>
            <span className={valueClass}>{formatCurrency(-course.discount)}</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span className={`font-bold text-green-400 ${labelClass}`}>Total</span>
            <span className={`font-bold text-green-400 ${valueClass}`}>
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
