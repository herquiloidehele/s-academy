"use client";

import { useRouter } from "next/navigation";
import { ICourse } from "@/app/backend/business/course/CourseData";
import { Constants } from "@/utils/Constants";
import AvatarImage1 from "@/assets/images/avatar1.png";
import AvatarImage2 from "@/assets/images/avatar2.png";
import AvatarImage3 from "@/assets/images/avatar3.png";
import AvatarImage4 from "@/assets/images/avatar4.png";
import HeroImage from "@/assets/images/hero1.jpg";
import Image from "next/image";

interface IHeroSectionProps {
  course: ICourse;
}
export default function HeroSection(props: IHeroSectionProps) {
  const router = useRouter();

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 h-auto mt-24 md:mt-auto">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center h-auto md:h-[100vh]">
        <div>
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Encontre os melhores <span className="text-green-400">Cursos</span>
          </h1>
          <p className="mt-3 sm:text-md md:text-lg text-gray-500 dark:text-neutral-400">
            A melhor plataforma para você encontrar os melhores cursos online. Aprenda com os melhores tutores ou
            mentores
          </p>

          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <a
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-400 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
              href={`#${Constants.UI.SECTIONS.COURSE}`}
            >
              Ver cursos
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
            <a
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              href="#"
            >
              Vender meu curso
            </a>
          </div>

          <div className="hidden md:flex justify-start mt-6 w-100">
            <div className="sm:flex sm:justify-start sm:items-center text-center sm:text-start w-100">
              <div className="shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5">
                <div className="flex justify-center -space-x-3">
                  <Image
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900 w-[32] h-[32]"
                    src={AvatarImage1.src}
                    alt="Avatar"
                    width={32}
                    height={32}
                    unoptimized
                  />
                  <Image
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    alt="Avatar"
                    width={32}
                    height={32}
                    unoptimized
                    src={AvatarImage2.src}
                  />
                  <Image
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    alt="Avatar"
                    width={32}
                    height={32}
                    unoptimized
                    src={AvatarImage3.src}
                  />
                  <Image
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    alt="Avatar"
                    width={32}
                    height={32}
                    unoptimized
                    src={AvatarImage4.src}
                  />
                  <span className="inline-flex items-center justify-center size-8 rounded-full ring-2 ring-white bg-gray-800 dark:bg-neutral-900 dark:ring-neutral-900">
                    <span className="text-xs font-medium leading-none text-white uppercase">5K+</span>
                  </span>
                </div>
              </div>

              <div className="border-t sm:border-t-0 sm:border-s border-gray-200 w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0 dark:border-neutral-700"></div>

              <div className="pt-5 sm:pt-0 sm:ps-5">
                <div className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Confiado Por</div>
                <div className="text-sm text-gray-500 dark:text-neutral-500">Milhares de estudantes em todo país</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative ms-4">
          <img className="w-full rounded-md" alt="Hero Image" src={HeroImage.src} />
          <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>

          <div className="absolute bottom-0 start-0">
            <svg
              className="w-2/3 ms-auto h-auto text-white dark:text-neutral-900"
              width="630"
              height="451"
              viewBox="0 0 630 451"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="531" y="352" width="99" height="99" fill="currentColor" />
              <rect x="140" y="352" width="106" height="99" fill="currentColor" />
              <rect x="482" y="402" width="64" height="49" fill="currentColor" />
              <rect x="433" y="402" width="63" height="49" fill="currentColor" />
              <rect x="384" y="352" width="49" height="50" fill="currentColor" />
              <rect x="531" y="328" width="50" height="50" fill="currentColor" />
              <rect x="99" y="303" width="49" height="58" fill="currentColor" />
              <rect x="99" y="352" width="49" height="50" fill="currentColor" />
              <rect x="99" y="392" width="49" height="59" fill="currentColor" />
              <rect x="44" y="402" width="66" height="49" fill="currentColor" />
              <rect x="234" y="402" width="62" height="49" fill="currentColor" />
              <rect x="334" y="303" width="50" height="49" fill="currentColor" />
              <rect x="581" width="49" height="49" fill="currentColor" />
              <rect x="581" width="49" height="64" fill="currentColor" />
              <rect x="482" y="123" width="49" height="49" fill="currentColor" />
              <rect x="507" y="124" width="49" height="24" fill="currentColor" />
              <rect x="531" y="49" width="99" height="99" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
