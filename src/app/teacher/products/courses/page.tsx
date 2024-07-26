"use client";
import React from "react";
import CoursesCard from "@/app/teacher/products/courses/components/CoursesCard";
import { SearchIcon } from "lucide-react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import { motion } from "framer-motion";

const courses = [
  {
    id: "1",
    name: "Introdução ao Desenvolvimento Web",
    description: "Aprenda os fundamentos do desenvolvimento web, incluindo HTML, CSS e JavaScript.",
    price: 49.99,
    discount: 10,
    duration: "5 horas",
    categories: ["Desenvolvimento Web", "Programação"],
    cover:
      "https://static-media.hotmart.com/VOyDIQTXN27AKcEA33-D8P_dIVQ=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/45f87483-5b35-4a3e-81e0-248b5ada747f/EBOOK_compressedpdf_20240427_174241_0000.png?w=920",
    promo_video: "https://example.com/videos/webdev_intro.mp4",
  },
  {
    id: "2",
    name: "Curso Completo de React",
    description: "Domine o desenvolvimento de aplicações front-end com React, incluindo hooks e state management.",
    price: 99.99,
    discount: 20,
    duration: "10 horas",
    categories: ["Desenvolvimento Web", "Front-end", "React"],
    cover:
      "https://plus.unsplash.com/premium_photo-1721199111143-aac4b595f580?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promo_video: "https://example.com/videos/react_complete.mp4",
  },
  {
    id: "3",
    name: "Design de UI/UX para Iniciantes",
    description:
      "Aprenda os princípios de design de interface e experiência do usuário para criar produtos digitais envolventes.",
    price: 39.99,
    discount: 0,
    duration: "7 horas",
    categories: ["Design", "UI/UX"],
    cover:
      "https://plus.unsplash.com/premium_photo-1720884610367-a604a449d3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promo_video: "https://example.com/videos/uiux_design.mp4",
  },
  {
    id: "4",
    name: "Python para Data Science",
    description: "Explore o mundo da ciência de dados com Python, incluindo pandas, numpy e visualização de dados.",
    price: 79.99,
    discount: 15,
    duration: "8 horas",
    categories: ["Data Science", "Programação", "Python"],
    cover:
      "https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promo_video: "https://example.com/videos/python_datascience.mp4",
  },
  {
    id: "5",
    name: "Design de UI/UX para Iniciantes",
    description:
      "Aprenda os princípios de design de interface e experiência do usuário para criar produtos digitais envolventes.",
    price: 39.99,
    discount: 0,
    duration: "7 horas",
    categories: ["Design", "UI/UX"],
    cover:
      "https://plus.unsplash.com/premium_photo-1720884610367-a604a449d3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    promo_video: "https://example.com/videos/uiux_design.mp4",
  },
];

function CoursePage(props) {
  const router = useRouter();
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
      </div>

      <div className="grid grid-cols-4 gap-3">
        {courses.map((course, index) => (
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
    </div>
  );
}

export default CoursePage;
