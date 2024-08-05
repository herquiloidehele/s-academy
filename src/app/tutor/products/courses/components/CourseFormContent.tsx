"use client";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ModuleFormDialog } from "@/app/tutor/products/courses/components/ModuleFormDialog";
import ModuleItemList from "@/app/tutor/products/courses/components/ModuleItemList";
import EmptyAnimation from "@/assets/animation/empty.json";
import EmptyState from "@/components/empty-list/EmptyState";

function CourseFormContent() {
  const courseDto = useCourseStore((state) => state.courseDto);
  const canCourseBeSaved = useCourseStore((state) => state.canCourseBeSaved);
  const router = useRouter();
  const goToNextStep = useCourseStore((state) => state.goToNextStep);

  if (!courseDto || !courseDto.modules || courseDto.modules.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <EmptyState
          animationData={EmptyAnimation}
          title={"Nenhum módulo encontrado"}
          description={"Registe um novo módulo"}
        >
          <ModuleFormDialog>
            <ButtonElement
              shape={ButtonShape.SQUARE}
              size={ButtonSize.SMALL}
              fillType={FillType.FILLED}
              type={ButtonType.PRIMARY}
              onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <PlusIcon className="size-8" />
                <span>Adicionar Módulo</span>
              </div>
            </ButtonElement>
          </ModuleFormDialog>
        </EmptyState>
        <div className="flex flex-row w-full justify-end">
          <ButtonElement
            onClick={useCourseStore.getState?.().goToPreviousStep}
            fillType={FillType.FILLED}
            shape={ButtonShape.SQUARE}
            size={ButtonSize.MEDIUM}
            type={ButtonType.SECONDARY}
          >
            <span className="px-4">Voltar</span>
          </ButtonElement>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-row justify-end gap-2">
        <ModuleFormDialog>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.PRIMARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="size-8" />
              <span>Adicionar Módulo</span>
            </div>
          </ButtonElement>
        </ModuleFormDialog>
      </div>
      <Accordion type="single" collapsible>
        {courseDto.modules.map((module, index) => (
          <ModuleItemList module={module} index={index} key={index} />
        ))}
      </Accordion>
      <div className="flex flex-row gap-2 w-full justify-end">
        <ButtonElement
          onClick={useCourseStore.getState?.().goToPreviousStep}
          fillType={FillType.FILLED}
          shape={ButtonShape.SQUARE}
          size={ButtonSize.MEDIUM}
          type={ButtonType.SECONDARY}
        >
          <span className="px-4">Voltar</span>
        </ButtonElement>
        <ButtonElement
          shape={ButtonShape.SQUARE}
          size={ButtonSize.SMALL}
          fillType={FillType.FILLED}
          type={ButtonType.PRIMARY}
          disabled={!canCourseBeSaved}
          onClick={() => goToNextStep()}
        >
          <span>Próximo</span>
        </ButtonElement>
      </div>
    </div>
  );
}

export default CourseFormContent;