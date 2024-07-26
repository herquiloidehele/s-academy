"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";

function CourseFormPreview({ formData }: { formData: any }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/course-form");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 rounded-md shadow-md space-y-4">
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
          <video src={formData.promo_video} />
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
