import { ICourse } from "@/app/business/course/CourseData";

class CourseManager {
  private readonly DEFAULT_COURSE_ID = "Q0us6qiWzX00sF2IZyQL";

  private defaultCourse: ICourse = {
    id: this.DEFAULT_COURSE_ID,
    title: "Shopify - Curso completo",
    price: 3000,
    description: "Curso completo de Shopify",
    duration: "4 semanas",
    discount: 100,
  };

  private readonly LOG_TAG = "CourseManager";

  public getDefaultCourse() {
    return this.defaultCourse;
  }

  public getTotalPrice(course: ICourse) {
    return course.price - course.discount;
  }
}

export default new CourseManager();
