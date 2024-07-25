"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import useCourseStore from "@/app/teacher/products/courses/courseStore";
import { truncateText } from "@/utils/functions";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { LessonFormDialog } from "@/app/teacher/products/courses/components/LessonFormDialog";
import { FolderOpen } from "lucide-react";

function CourseFormContent(props) {
  const modules = useCourseStore((state) => state.modules);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row justify-end gap-2">
        <ButtonElement
          shape={ButtonShape.SQUARE}
          size={ButtonSize.SMALL}
          fillType={FillType.FILLED}
          type={ButtonType.SECONDARY}
          onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
        >
          <div className="flex flex-row gap-2 justify-center items-center">
            <PlusIcon className="size-8" />
            <span>Adicionar Módulo</span>
          </div>
        </ButtonElement>
        <LessonFormDialog>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.PRIMARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="size-8" />
              <span>Adicionar Aula</span>
            </div>
          </ButtonElement>
        </LessonFormDialog>
      </div>
      <Accordion type="single" collapsible>
        {modules.map((module) => (
          <AccordionItem key={module.id} value={module.id}>
            <AccordionTrigger>
              <div className="flex flex-row gap-2 font-light items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FolderOpen className="size-8 font-extralight stroke-1" />
                </div>
                <span className="text-gray-500 text">{module.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id}>
                    <a
                      href="#"
                      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
                        src="https://plus.unsplash.com/premium_photo-1721199111143-aac4b595f580?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <div className="flex flex-col justify-between p-4 leading-normal">
                        <span className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          {truncateText(lesson.title, 15)}
                        </span>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {truncateText(lesson.description || "", 35)}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex flex-row w-full justify-end">
        <ButtonElement
          shape={ButtonShape.SQUARE}
          size={ButtonSize.SMALL}
          fillType={FillType.FILLED}
          type={ButtonType.TERTIARY}
          onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
        >
          <div className="flex flex-row gap-2 justify-center items-center">
            <span>Próximo</span>
          </div>
        </ButtonElement>
      </div>
    </div>
  );
}

export default CourseFormContent;
