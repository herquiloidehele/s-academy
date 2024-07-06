import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function PaymentCard() {
  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <CreditCardIcon className="w-6 h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-xl text-blue-950"}>Pagamento M-PESA</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone" className={"text-blue-950"}>
                Nome
              </Label>
              <Input disabled id="phone" placeholder="Introduza Número M-Pesa" className={"h-12"} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button disabled className={"bg-green-400 w-3/12"}>
          PAGAR
        </Button>
      </CardFooter>
    </Card>
  );
}
