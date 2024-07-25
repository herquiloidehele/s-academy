import { Skeleton } from "@/components/ui/skeleton";

export default function CourseListLoadingState() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill_,_minmax(350px_,_1fr))] gap-x-4 gap-y-11">
      {Array.from({ length: 10 }).map((_, index) => (
        <CourseEntryLoadingState key={index} />
      ))}
    </div>
  );
}

function CourseEntryLoadingState() {
  return (
    <div className="flex flex-col gap-1">
      <a className="block relative h-80 rounded overflow-hidden aspect-square">
        <Skeleton className="object-cover object-center w-full h-full block bg-gray-300" />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
          <Skeleton className="w-20 h-4 bg-gray-300" />
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          <Skeleton className="w-40 h-6 bg-gray-300" />
        </h2>
        <p className="mt-1 text-green-400 font-bold">
          <Skeleton className="w-12 h-4 bg-gray-300" />
        </p>
      </div>
    </div>
  );
}
