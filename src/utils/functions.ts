import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";
import { ICourseDto } from "@/app/backend/business/course/CourseData";
import Logger from "@/utils/Logger";
import { firebaseClientApp } from "@/app/backend/services/FirebaseClientConfig";

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
export function getCategoryLabel(value: string): string {
  const category = useCourseStore.getState?.().categoriesOptions.find((option) => option.value === value);
  return category ? category.label : "Categoria desconhecida";
}

async function uploadLessonVideoOnVimeo(videoFile: File | undefined) {
  return 0;
}

export async function saveCourseAndFilesPrepareTheCourseObjectToBeSaved(courseDto: ICourseDto) {
  const LOG_TAG = "saveCourseFiles";
  Logger.debug(LOG_TAG, `Uploading course files...`, courseDto);

  if ("type" in courseDto.coverFile) {
    const imageBlob = new Blob([courseDto.coverFile], { type: courseDto.coverFile.type });

    const opt = {
      filename: courseDto.coverFile?.name || "cover.png",
    };

    const storage = getStorage(firebaseClientApp);
    const filesRef = ref(storage, `files/${opt.filename}`);
    Logger.debug(LOG_TAG, `Uploading cover file...`);

    const snapshot = await uploadBytes(filesRef, imageBlob);
    Logger.debug(LOG_TAG, `Uploaded cover file!`);

    courseDto.coverUrl = await getDownloadURL(snapshot.ref);
  }

  if (courseDto.modules) {
    courseDto.modules = await Promise.all(
      courseDto.modules.map(async (module) => {
        if (module.lessons) {
          module.lessons = await Promise.all(
            module.lessons.map(async (lesson) => {
              if ("type" in lesson.materialFile) {
                const materialBlob = new Blob([lesson.materialFile], { type: lesson.materialFile.type });

                const opt = {
                  filename: lesson.materialFile?.name || `material_${new Date().toISOString()}`,
                };

                const storage = getStorage(firebaseClientApp);
                const filesRef = ref(storage, `files/${opt.filename}`);
                Logger.debug(LOG_TAG, `Uploading lesson material file...`);

                const snapshot = await uploadBytes(filesRef, materialBlob);
                Logger.debug(LOG_TAG, `Uploaded lesson material file!`);

                lesson.materialUrl = await getDownloadURL(snapshot.ref);
                lesson.videoRef = await uploadLessonVideoOnVimeo(lesson.videoFile);
              }

              return lesson;
            }),
          );
        }
        return module;
      }),
    );
  }

  return JSON.parse(JSON.stringify(courseDto));
}
