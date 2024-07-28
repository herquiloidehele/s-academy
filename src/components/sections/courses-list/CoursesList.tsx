"use client";

import { motion } from "framer-motion";
import CourseEntry from "@/components/course/course-entry/CourseEntry";
import { ICourse } from "@/app/backend/business/course/CourseData";
import { Constants, CourseCardType } from "@/utils/Constants";
import Link from "next/link";

interface ICCourseListProps {
  courses: ICourse[];
  cardType: CourseCardType;
}
export default function CoursesList(props: ICCourseListProps) {
  if (!props.courses || props.courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 flex-col gap-3 ">
        <p className="text-gray-500 text-lg">Nenhum curso encontrado</p>
        <Link
          className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-400 text-white hover:bg-green-300 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
          href={Constants.APP_ROUTES.COURSES_LIST}
        >
          Ver cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill_,_minmax(350px_,_1fr))] gap-x-4 gap-y-11">
      {props.courses.map((course, index) => (
        <motion.div
          key={`${course.id}-${index}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          <CourseEntry course={course} cardType={props.cardType} />
        </motion.div>
      ))}
    </div>
  );
}
