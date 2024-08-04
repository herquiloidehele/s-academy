import React from "react";
import { truncateText } from "@/utils/functions";
import { COURSE_STATUS, ICourse } from "@/app/backend/business/course/CourseData";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function CoursesCard({ course }: { course: ICourse }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  hover:scale-105 transition-transform duration-300 ease-in-out">
      <a href="#">
        <img
          loading="lazy"
          width="100"
          height="100"
          src={course.coverUrl}
          alt="Course cover"
          className="relative h-[250px] w-full object-cover rounded-t-lg"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {truncateText(course.title, 25)}{" "}
            {course.status === COURSE_STATUS.PUBLISHED && <Badge variant="default">Publicado</Badge>}
            {course.status === COURSE_STATUS.DRAFT && <Badge variant="secondary">Rascunho</Badge>}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {truncateText(course.description || "", 75)}
        </p>

        <div className="w-full flex flex-row justify-end">
          {course.status === COURSE_STATUS.PUBLISHED && (
            <a
              href="#"
              className="self-end flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Ver</span>
              <ArrowRight className="size-4" />
            </a>
          )}
          {course.status === COURSE_STATUS.DRAFT && (
            <a
              href="#"
              className="self-end flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {" "}
              <span>Editar</span>
              <ArrowRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesCard;
