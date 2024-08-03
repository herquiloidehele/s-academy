import useCourseStore from "@/app/tutor/products/courses/courseStore";

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
function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
