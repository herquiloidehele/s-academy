import Header from "@/components/header/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="px-4 xl:px-0 my-24 lg:mt-28 max-w-[1300px] mx-auto">
      <Header solidBg />

      <div className={"grid grid-cols-1 lg:grid-cols-[3fr,_1fr] gap-6"}>
        <div className={"flex flex-col gap-y-3 justify-start"}>
          <div>
            <Skeleton className="w-full h-96" />
          </div>

          <div>
            <Skeleton className="w-full h-40" />
          </div>
        </div>

        <div>
          <div>
            <Skeleton className="w-full h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}
