"use client";
import React, { useEffect } from "react";
import FormStepper from "@/app/tutor/products/courses/components/FormStepper";
import CourseFormInformation from "@/app/tutor/products/courses/components/CourseFormInformation";
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import useCourseStore, { IFormStep } from "@/app/tutor/products/courses/courseStore";
import { FolderOpen } from "lucide-react";
import CourseFormContent from "@/app/tutor/products/courses/components/CourseFormContent";
import CourseFormReview from "@/app/tutor/products/courses/components/CourseFormPreview";
import { useRouter } from "next/navigation";

function FormPage() {
  const router = useRouter();
  const resetStore = useCourseStore((state) => state.reset);

  const formSteps: IFormStep[] = [
    {
      title: "Informações do Curso",
      key: "course-information",
      description: "Prencher informações do curso",
      icon: <InformationCircleIcon className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormInformation />,
      state: false,
    },
    {
      title: "Conteúdo do Curso",
      key: "course-Content",
      description: "Adicionar conteúdo ao curso",
      icon: <FolderOpen className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormContent />,
      state: false,
    },
    {
      title: "Revisão dos Dados",
      key: "course-Preview",
      description: "Rever os dados do curso",
      icon: <EyeIcon className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormReview />,
      state: false,
    },
  ];
  const currentStepIndex = useCourseStore((state) => state.currentStepIndex);
  const [currentFormStep, setCurrentFormStep] = React.useState<IFormStep>(formSteps[0]);

  useEffect(() => {
    setCurrentFormStep(formSteps[currentStepIndex]);
  }, [currentStepIndex]);

  return (
    <div className="flex flex-row gap-3 ">
      <FormStepper
        title="Registo de curso"
        steps={formSteps}
        onBackClick={() => {
          router.back();
          resetStore();
        }}
      />

      <div className="flex flex-col w-full">
        <span className="text-3xl font-bold mb-5 text-gray-800">{currentFormStep.title}</span>
        <hr className="w-full h-2 text-primary" />
        <div className="w-full">{currentFormStep.page}</div>
      </div>
    </div>
  );
}

export default FormPage;
