import React from "react";
import { truncateText } from "@/utils/functions";

interface ICourse {
  name: string; // Nome do curso
  description: string; // Breve descrição do curso
  price: number; // Preço do curso
  discount: number; // Percentual de desconto (0 se não houver desconto)
  duration: string; // Duração do curso (ex: "5 horas")
  categories: string[]; // Lista de categorias às quais o curso pertence
  cover: string; // URL da imagem de capa do curso
  promo_video: string; // URL do vídeo promocional do curso
}

function CoursesCard({ course }: { course: ICourse }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          loading="lazy"
          width="100"
          height="100"
          src={course.cover}
          alt="Course cover"
          className="relative h-[250px] w-full object-cover transition-transform duration-300 hover:scale-105 focus:scale-105"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {truncateText(course.name, 50)}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateText(course.description, 75)}</p>
        <div className="w-full flex flex-row justify-end">
          <a
            href="#"
            className="self-end inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CoursesCard;
