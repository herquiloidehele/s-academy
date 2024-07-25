import { ICourse } from "@/app/backend/business/course/CourseData";

export const CourseMock: ICourse = {
  id: "1",
  coverUrl: "https://dummyimage.com/460x460",
  modules: [],
  price: 5000,
  title: "Curso de Programação",
  discount: 0,
  categories: ["Programação", "Desenvolvimento"],
  duration: "10:30",
};
