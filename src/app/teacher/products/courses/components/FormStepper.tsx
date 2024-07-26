"use client";
import React, { useEffect } from "react";
import useCourseStore, { IFormStep } from "@/app/teacher/products/courses/courseStore";
import { ArrowLeft } from "lucide-react";

function FormStepper({ steps, onBackClick, title }: { steps: IFormStep[]; onBackClick?: () => void; title: string }) {
  const setCurrentFormStep = useCourseStore((state) => state.setCurrentFormStep);
  const currentFormStep = useCourseStore((state) => state.currentFormStep);

  useEffect(() => {
    setCurrentFormStep(steps[0]);
  }, []);
  return (
    <div className="border-r-2 flex flex-col gap-3 h-screen pr-3">
      <div className="flex flex-row gap-2 justify-start">
        <ArrowLeft className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => onBackClick()} />
        <span className="font-medium leading-tight text-gray-600">{title}</span>
      </div>
      <ol className="relative text-gray-500 border-s border-gray-300 dark:border-gray-700 dark:text-gray-400">
        {steps.map((step, index) => (
          <li key={step.key} className="mb-10 ms-6 cursor-pointer" onClick={() => setCurrentFormStep(step)}>
            <span
              className={`absolute flex items-center justify-center  w-8 h-8 ${step.state || currentFormStep.key == step.key ? "bg-green-100 text-green-600" : "bg-gray-100 text-blue-600"} rounded-full -start-4 ring-2 ring-blue-100 dark:ring-gray-900 dark:bg-green-900`}
            >
              {step.state ? (
                <svg
                  className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                step.icon
              )}
            </span>
            <span className="font-medium leading-tight">{step.title}</span>
            <p className="text-sm opacity-50">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default FormStepper;
