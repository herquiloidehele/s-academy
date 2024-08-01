"use client";
import React from "react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { Loader2Icon } from "lucide-react";

function CourseFormPreview() {
  const courseDto = useCourseStore((state) => state.courseDto);
  const setCurrentStepIndex = useCourseStore((state) => state.setCurrentStepIndex);
  const canCourseBeSaved = useCourseStore((state) => state.canCourseBeSaved);
  const [loading, setLoading] = React.useState(false);

  const handleEdit = () => {
    setCurrentStepIndex(0);
  };

  const handleSaveCourse = async () => {
    setLoading(true);
    try {
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-2 p-4 rounded-md shadow-md space-y-4">
        <div>
          <strong className="block font-bold">Nome:</strong>
          <p>{courseDto?.title}</p>
        </div>
        <div>
          <strong className="block font-bold">Descrição:</strong>
          <p>{courseDto?.description}</p>
        </div>
        <div>
          <strong className="block text-lg font-bold">Preço:</strong>
          <p>{courseDto?.price} Mtn</p>
        </div>
        <div>
          <strong className="block text-lg font-bold">Desconto:</strong>
          <p>{courseDto?.discount}%</p>
        </div>
        <div>
          <strong className="block text-lg font-bold">Capa:</strong>
          <img
            loading="lazy"
            width="100"
            height="100"
            src={URL.createObjectURL(courseDto?.coverFile)}
            alt="Course cover"
            className="relative h-fit w-fit object-cover "
          />
        </div>
        <div>
          <strong className="block text-lg font-bold">Video Promocional:</strong>
          <video controls src={URL.createObjectURL(courseDto?.promoVideoFile)} className="w-full h-fit object-cover">
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
          disabled={!canCourseBeSaved}
          onClick={() => handleSaveCourse()}
        >
          {loading ? (
            <div className="flex flex-row gap-2">
              <Loader2Icon className="size-6 animate-spin" /> <span>A gravar</span>
            </div>
          ) : (
            "Gravar"
          )}
        </ButtonElement>
      </div>
    </div>
  );
}

export default CourseFormPreview;
