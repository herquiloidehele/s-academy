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

export function getCategoryOptions(values: string[]): { value: string; label: string }[] {
  return values.map((value) => {
    return {
      value: value,
      label: getCategoryLabel(value),
    };
  });
}
function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
