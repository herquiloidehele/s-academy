"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Constants } from "@/utils/Constants";
import { payCourseSubscription } from "@/app/backend/actions/subscription";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { toast } from "sonner";

interface IPaymentCardProps {
  userId?: string;
  courseId: string;
}
export default function PaymentCard(props: IPaymentCardProps) {
  const isUserAuthenticated = !!props.userId;
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { phoneNumber: string; userId?: string; courseId: string }) =>
      payCourseSubscription(data.phoneNumber, data.courseId, data.userId),
    onSuccess: ({ success }) => {
      if (success) {
        toast.success("Subscrição paga com sucesso");
        router.push(Constants.APP_ROUTES.COURSES);
      }
    },
    onError: (error) => {
      toast.error("Erro ao pagar a subscrição");
    },
  });

  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <CreditCardIcon className="w-4 h-4 lg:w-6 lg:h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-blue-950"}>Pagamento M-PESA</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone" className={"text-blue-950 text-sm lg:text-md"}>
                Nome
              </Label>
              <Input
                disabled={!isUserAuthenticated}
                id="phone"
                placeholder="Introduza Número M-Pesa"
                className={"h-12 text-sm lg:text-md"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                max={9}
                min={0}
                type="number"
                inputMode={"tel"}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <ButtonElement
          disabled={!isUserAuthenticated}
          className={"bg-green-400 w-3/12"}
          onClick={() => mutate({ phoneNumber: phoneNumber, courseId: props.courseId, userId: props.userId })}
          isLoading={isPending}
          type={ButtonType.PRIMARY}
          fillType={FillType.FILLED}
          size={ButtonSize.SMALL}
          shape={ButtonShape.SQUARE}
        >
          PAGAR
        </ButtonElement>
      </CardFooter>
    </Card>
  );
}
