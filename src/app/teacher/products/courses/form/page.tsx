"use client";
import React from "react";
import FormStepper from "@/app/teacher/products/courses/components/FormStepper";
import CourseFormInformation from "@/app/teacher/products/courses/components/CourseFormInformation";
import { EyeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import useCourseStore, { IFormStep } from "@/app/teacher/products/courses/courseStore";
import { FolderOpen } from "lucide-react";
import CourseFormContent from "@/app/teacher/products/courses/components/CourseFormContent";
import { useRouter } from "next/navigation";
import CourseFormReview from "@/app/teacher/products/courses/components/CourseFormPreview";
import { courses } from "@/app/teacher/products/courses/page";

function FormPage() {
  const modules = useCourseStore((state) => state.modules);

  const formSteps: IFormStep[] = [
    {
      title: "Course Information",
      key: "course-information",
      description: "Fill in the course information",
      icon: <InformationCircleIcon className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormInformation />,
      state: false,
    },
    {
      title: "Course Content",
      key: "course-Content",
      description: "Add course content",
      icon: <FolderOpen className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormContent />,
      state: false,
    },
    {
      title: "Course Preview",
      key: "course-Preview",
      description: "Preview the course",
      icon: <EyeIcon className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormReview formData={{ ...courses[0], modules: modules, title: "tsee", tutorId: "eee" }} />,
      state: false,
    },
  ];
  const currentFormStep = useCourseStore((state) => state.currentFormStep);
  const router = useRouter();
  return (
    <div className="flex flex-row gap-3 ">
      <FormStepper
        title="Registo de curso"
        steps={formSteps}
        onBackClick={() => {
          router.back();
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
