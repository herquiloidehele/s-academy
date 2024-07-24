"use client";

import ChartIcon from "@/assets/icons/chart-icon.svg";
import { motion } from "framer-motion";
import { Constants } from "@/utils/Constants";
import CourseEntry from "@/components/course/course-entry/CourseEntry";
import { ICourse } from "@/app/backend/business/course/CourseData";

interface ICCourseListProps {
  courses: ICourse[];
}
export default function CoursesList(props: ICCourseListProps) {
  return (
    <div
      className={"w-full py-14 px-4 lg:px-6 lg:py-24 bg-[rgba(217,255,229,15%)] relative scroll-mt-20"}
      id={Constants.UI.SECTIONS.COURSES}
    >
      <div className={"max-w-[1300px] mx-auto "}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <motion.span initial={{ x: -1000 }} whileInView={{ x: 0 }}>
            <ChartIcon className="w-6 h-6 text-green-400" />
          </motion.span>
        </motion.div>

        <div>
          <h2 className={"text-2xl md:text-4xl font-bold flex justify-center gap-2 items-center"}>
            <span className={"text-black"}>Principais</span>
            <span className={"text-green-400"}> Cursos</span>
          </h2>

          <section className="text-gray-600 body-font">
            <div className="container px-0 md:px-5 py-8 md:py-16 mx-auto">
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
