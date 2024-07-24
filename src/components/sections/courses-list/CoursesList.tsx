"use client";

import { motion } from "framer-motion";
import CourseEntry from "@/components/course/course-entry/CourseEntry";
import { ICourse } from "@/app/backend/business/course/CourseData";

interface ICCourseListProps {
  courses: ICourse[];
}
export default function CoursesList(props: ICCourseListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill_,_minmax(350px_,_1fr))] gap-x-4 gap-y-11">
      {props.courses.map((course, index) => (
        <motion.div
          key={`${course.id}-${index}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          <CourseEntry course={course} />
        </motion.div>
      ))}
    </div>
  );
}
