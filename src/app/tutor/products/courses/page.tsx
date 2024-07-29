"use client";
import React from "react";
import CoursesCard from "@/app/tutor/products/courses/components/CoursesCard";
import { SearchIcon } from "lucide-react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import { motion } from "framer-motion";
import EmptyAnimation from "@/assets/animation/empty.json";
import Lottie from "react-lottie";

function CoursePage() {
  const router = useRouter();
  const [coursesData, setCoursesData] = React.useState([]);

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className="flex flex-row w-full items-center justify-between gap-6 mb-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <SearchIcon className="size-6" />
          </div>
          <input
            type="text"
            id="email-address-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="procura por nome"
          />
        </div>
        {coursesData.length > 0 && (
          <div className="w-full flex flex-row justify-end">
            <ButtonElement
              shape={ButtonShape.SQUARE}
              size={ButtonSize.SMALL}
              fillType={FillType.FILLED}
              type={ButtonType.PRIMARY}
              onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <PlusIcon className="size-8" />
                <span>Adicionar Curso</span>
              </div>
            </ButtonElement>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 mb-8">
        {coursesData &&
          coursesData.map((course, index) => (
            <div key={index}>
              <motion.div
                key={`${course.id}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <CoursesCard course={course} />
              </motion.div>
            </div>
          ))}
      </div>
      {coursesData.length === 0 && (
        <div className="w-full flex flex-col gap-2 justify-center items-center py-8 bg-white shadow-md rounded-md">
          <Lottie options={lottieDefaultOptions} height={400} width={400} />
          <span className="text-gray-600 font-semibold text-lg mt-4">Nenhum curso encontrado</span>
          <p className="text-gray-400 text-sm mt-2">Crie um novo curso ou explore outras categorias</p>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.PRIMARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="size-8" />
              <span>Adicionar Curso</span>
            </div>
          </ButtonElement>
        </div>
      )}
    </div>
  );
}

export default CoursePage;
