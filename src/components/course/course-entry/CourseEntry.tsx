import { ICourse } from "@/app/backend/business/course/CourseData";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const FALLBACK_IMAGE_URL = "https://dummyimage.com/460x460";

interface ICourseEntryProps {
  course: ICourse;
}
export default function CourseEntry(props: ICourseEntryProps) {
  const { course } = props;
  const category = course.categories?.[0] || "Sem Categoria";

  return (
    <div className="flex flex-col gap-1">
      <a className="block relative h-80 rounded overflow-hidden aspect-square">
        <Image
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={course.coverUrl || FALLBACK_IMAGE_URL}
          width={460}
          height={460}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{course.title}</h2>
        <p className="mt-1 text-green-400 font-bold">{formatCurrency(course.price)}</p>
      </div>
    </div>
  );
}
