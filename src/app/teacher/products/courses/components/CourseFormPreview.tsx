"use client";
import React from "react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import useCourseStore from "@/app/teacher/products/courses/courseStore";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CourseFormInformation from "@/app/teacher/products/courses/components/CourseFormInformation";

function CourseFormPreview({ formData }: { formData: any }) {
  const setCurrentFormStep = useCourseStore((state) => state.setCurrentFormStep);

  const handleEdit = () => {
    setCurrentFormStep({
      title: "Course Information",
      key: "course-information",
      description: "Fill in the course information",
      icon: <InformationCircleIcon className="w-3 h-3 md:w-6 md:h-6 font-light stroke-1 text-md" />,
      page: <CourseFormInformation />,
      state: false,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-2 p-4 rounded-md shadow-md space-y-4">
        <div>
          <strong className="block font-light">Nome:</strong>
          <p>{formData.title}</p>
        </div>
        <div>
          <strong className="block font-light">Descrição:</strong>
          <p>{formData.description}</p>
        </div>
        <div>
          <strong className="block text-lg font-light">Preço:</strong>
          <p>{formData.price} Mtn</p>
        </div>
        <div>
          <strong className="block text-lg font-light">Disconto:</strong>
          <p>{formData.discount}%</p>
        </div>
        <div>
          <strong className="block text-lg font-light">Capa:</strong>
          <img
            loading="lazy"
            width="100"
            height="100"
            src={formData.cover}
            alt="Course cover"
            className="relative h-fit w-fit object-cover "
          />
        </div>
        <div>
          <strong className="block text-lg font-light">Video Promocional:</strong>
          <video
            controls
            src={"https://youtu.be/78Ex_vru4SU?list=RDEM-Yw74Q2nLPAU8zT3co3EmQ"}
            className="w-full h-fit object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="my-6 flex justify-end gap-2">
        <ButtonElement
          onClick={handleEdit}
          fillType={FillType.FILLED}
          shape={ButtonShape.SQUARE}
          size={ButtonSize.MEDIUM}
          type={ButtonType.SECONDARY}
        >
          <span className="px-4">Editar</span>
        </ButtonElement>
        <ButtonElement
          fillType={FillType.FILLED}
          shape={ButtonShape.SQUARE}
          size={ButtonSize.MEDIUM}
          type={ButtonType.PRIMARY}
          onClick={() => alert("Form submitted successfully!")}
        >
          Gravar
        </ButtonElement>
      </div>
    </div>
  );
}

export default CourseFormPreview;
