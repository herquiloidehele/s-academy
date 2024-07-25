"use client";

import { ICourse } from "@/app/backend/business/course/CourseData";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import CheckIcon from "@/assets/images/check_black.svg";
import DeviceIcon from "@/assets/images/device-redesign.svg";
import PlayIcon from "@/assets/images/hours-redesign.svg";
import UserIcon from "@/assets/images/students-redesign.svg";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import { Fragment } from "react";

interface ICourseInfoProps {
  course: ICourse;
  totalModules: number;
  totalLessons: number;
}
export default function CourseInfo(props: ICourseInfoProps) {
  const router = useRouter();

  const courseFeatures = [
    { icon: <CheckIcon />, text: "Curso Verificado" },
    { icon: <DeviceIcon />, text: "Acesso em qualquer dispositivo" },
    {
      icon: <PlayIcon />,
      text: `${props.totalModules} módulos e mais de ${props.totalLessons - 1} aulas originais`,
    },
    { icon: <UserIcon />, text: "Acesso vitalício ao curso" },
  ];

  const handleBuyCourse = () => {
    router.push(Constants.APP_ROUTES.CHECKOUT(props.course.id));
  };

  return (
    <Fragment>
      <div className={"hidden lg:block w-100 fixed"}>
        <div className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4 md:p-7 flex flex-col gap-y-4">
            <h1 className={"text-black/70 text-2xl font-bold"}>
              {formatCurrency(props.course.price - props.course.discount)}
            </h1>

            <button
              className={
                "w-full bg-green-400 text-white text-md font-semibold py-4 rounded-lg hover:bg-green-300 focus:outline-none focus:shadow-md transition"
              }
              onClick={handleBuyCourse}
            >
              COMPRAR
            </button>

            <div className={"flex flex-col gap-y-4 my-4"}>
              {courseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-x-3">
                  <div className={"w-4 h-4"}>{feature.icon}</div>
                  <p className="text-xs text-gray-800 dark:text-neutral-200">{feature.text}</p>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 dark:border-neutral-700 my-3" />

            <div className={"space-y-3"}>
              <h2 className={"text-lg font-semibold text-gray-800 dark:text-neutral-200"}>Sobre o curso</h2>
              <p className={"space-x-1 text-sm text-gray-500 dark:text-neutral-500"}>
                <span className={"text-xs text-black/80"}>Formato:</span>
                <span className={"text-xs text-black/50"}>Curso totalmente online</span>
              </p>

              <p className={"space-x-1 text-sm text-gray-500 dark:text-neutral-500"}>
                <span className={"text-xs text-black/80"}>Categorias:</span>
                <span className={"text-xs text-black/50"}>
                  {props.course.categories?.join(",") || "Sem Categorias"}
                </span>
              </p>
            </div>

            <hr className="border-gray-200 dark:border-neutral-700 my-3" />

            <div className="flex items-center gap-x-2">
              <Image
                className="rounded-full size-10"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                alt="Avatar"
                width={40}
                height={40}
              />
              <div className="grow">
                <h3 className="font-medium text-sm text-gray-800 dark:text-neutral-200">Herquilóide Hele</h3>
                <p className="text-xs text-gray-500 dark:text-neutral-500">
                  {formatDate(Constants.UI.DATE_FORMATS.BASE_DATE, props.course.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileCourseInfo
        courseId={props.course.id}
        price={props.course.price}
        discount={props.course.discount}
        handleBuyCourse={handleBuyCourse}
      />
    </Fragment>
  );
}

interface IMobileCourseInfoProps {
  courseId: string;
  price: number;
  discount: number;
  handleBuyCourse: () => void;
}
function MobileCourseInfo(props: IMobileCourseInfoProps) {
  return (
    <div className={"lg:hidden fixed bottom-0 left-0 w-full shadow-[0_10px_30px_-11px_rgba(0,0,0,0.9)] bg-white"}>
      <div className="p-4 flex items-center justify-between gap-x-4">
        <h1 className={"text-black/70 text-xl md:text-2xl font-bold"}>
          {formatCurrency(props.price - props.discount)}
        </h1>

        <button
          className={
            "px-10 bg-green-400 text-white text-md font-semibold py-3 rounded-lg hover:bg-green-300 focus:outline-none focus:shadow-md transition"
          }
          onClick={props.handleBuyCourse}
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
}
