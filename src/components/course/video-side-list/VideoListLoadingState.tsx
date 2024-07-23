import { Skeleton } from "@/components/ui/skeleton";

export default function VideoListLoadingState() {
  return (
    <div className={"w-full flex flex-col gap-5"}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={"w-full flex flex-col gap-2"}>
          <Skeleton className={"h-5 w-20"} />
          <Skeleton className={"h-[150px] w-full"} />
        </div>
      ))}
    </div>
  );
}
