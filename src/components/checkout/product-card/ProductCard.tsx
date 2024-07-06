import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";

export default function ProductCard() {
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
            <span>Shopify curso completo</span>
            <span className={"font-normal"}>3.500 MZN</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span>Taxa Mpesa</span>
            <span className={"font-normal"}>200 MZN</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span>Desconto</span>
            <span className={"font-normal"}>-100 MZN</span>
          </div>

          <div className={"flex justify-between gap-5"}>
            <span className={"font-bold text-lg text-green-400"}>Total</span>
            <span className={"font-bold text-lg text-green-400"}>3.700 MZN</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
