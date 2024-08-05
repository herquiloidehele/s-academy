"use client";
import React from "react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Constants } from "@/utils/Constants";
import VideoPlayer from "@/components/course/video-player/VideoPlayer";

function CourseFormPreview() {
  const courseDto = useCourseStore((state) => state.courseDto);
  const setCurrentStepIndex = useCourseStore((state) => state.setCurrentStepIndex);
  const canCourseBeSaved = useCourseStore((state) => state.canCourseBeSaved);
  const publishCourse = useCourseStore((state) => state.publishCourse);
  const loading = useCourseStore((state) => state.loading);
  const router = useRouter();

  const handleEdit = () => {
    setCurrentStepIndex(0);
  };

  const handleSaveCourse = async () => {
    try {
      await publishCourse();
      toast.success("Curso publicado com sucesso");
      router.push(Constants.APP_ROUTES.TEACHER.COURSES);
    } catch (e) {
      toast.error("Erro ao publicar curso");
    }
  };
  return (
    <div className="container flex flex-col break-words mx-auto p-4">
      <div className="grid grid-cols-2 gap-2 p-4 rounded-md shadow-md space-y-4">
        <div>
          <strong className="block font-bold">Nome:</strong>
          <p>{courseDto?.title}</p>
        </div>
        <div>
          <strong className="block font-bold  w-fit">Descrição:</strong>
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
            src={courseDto?.coverUrl}
            alt="Course cover"
            className="relative h-fit w-fit object-cover "
          />
        </div>
        <div>
          <strong className="block text-lg font-bold">Video Promocional:</strong>
          {courseDto?.promoVideoRef && <VideoPlayer videoId={courseDto?.promoVideoRef!} />}
        </div>
      </div>
      <div className="my-2 flex justify-end gap-2">
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
          disabled={!canCourseBeSaved || loading}
          onClick={() => handleSaveCourse()}
        >
          {loading ? (
            <div className="flex flex-row gap-2">
              <Loader2Icon className="size-6 animate-spin" /> <span>A publicar</span>
            </div>
          ) : (
            "Publicar"
          )}
        </ButtonElement>
      </div>
    </div>
  );
}

export default CourseFormPreview;
