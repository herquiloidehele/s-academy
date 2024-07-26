"use client";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import useCourseStore from "@/app/teacher/products/courses/courseStore";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { LessonFormDialog } from "@/app/teacher/products/courses/components/LessonFormDialog";
import { ModuleFormDialog } from "@/app/teacher/products/courses/components/ModuleFormDialog";
import ModuleItemList from "@/app/teacher/products/courses/components/ModuleItemList";

function CourseFormContent(props) {
  const modules = useCourseStore((state) => state.modules);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row justify-end gap-2">
        <ModuleFormDialog>
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
        </ModuleFormDialog>
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
        {modules.map((module, index) => (
          <ModuleItemList module={module} index={index} />
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
