import Header from "@/components/header/Header";
import { SignupForm } from "@/components/signup-form/SignupForm";
import ProductCard from "@/components/checkout/product-card/ProductCard";
import PaymentCard from "@/components/checkout/payment-card/PaymentCard";
import AuthManager from "@/app/business/auth/AuthManager";
import SubscriptionManager from "@/app/business/subscription/SubscriptionManager";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";

export default async function page() {
  const authUser = await AuthManager.getAuthUser();

  const hasActiveSubscription = await SubscriptionManager.doesUserHaveActiveSubscription(authUser?.email);

  if (hasActiveSubscription) {
    return redirect(Constants.APP_ROUTES.COURSE);
  }

  return (
    <div className="max-w-[1300px] py-24 lg:py-32 mx-auto flex flex-col gap-3 px-4 xl:px-0">
      <Header solidBg />

      <div className={"flex flex-col gap-3"}>
        <div className={"grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 grid-flow-dense"}>
          <div className={"flex flex-col gap-5 lg:gap-8"}>
            <SignupForm />

            <div className={"block lg:hidden"}>
              <ProductCard />
            </div>

            <PaymentCard userId={authUser?.email} />
          </div>

          <div className={"hidden lg:flex flex-col gap-5"}>
            <ProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}
