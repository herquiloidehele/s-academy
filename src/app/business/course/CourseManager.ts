import { ICourse, ICourseSection, ILesson } from "@/app/business/course/CourseData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import _ from "lodash";

class CourseManager {
  private readonly DEFAULT_COURSE_ID = "Q0us6qiWzX00sF2IZyQL";

  private defaultCourse: ICourse = {
    id: this.DEFAULT_COURSE_ID,
    title: "Shopify - Curso completo",
    price: 4500,
    description: "Curso completo de Shopify",
    duration: "4 semanas",
    discount: 1500,
  };

  private readonly LOG_TAG = "CourseManager";

  public getDefaultCourse() {
    return this.defaultCourse;
  }

  public getTotalPrice(course: ICourse) {
    return course.price - course.discount;
  }

  public async getCourseSections(courseId: string): Promise<ICourseSection[]> {
    Logger.debug(this.LOG_TAG, `Getting lessons for course: ${courseId}`);

    try {
      const courseRef = await FirestoreService.getDocumentRefById(FirebaseCollections.COURSES, courseId);

      const lessons = await FirestoreService.getDocumentsByQuery<ILesson>(FirebaseCollections.LESSONS, {
        field: "courseId",
        operator: "==",
        value: courseRef,
      });

      const sortedLessonsByOrder = _.sortBy(lessons, "order");
      const sortedLessonsBySectionId = _.sortBy(sortedLessonsByOrder, "section.id");
      const sectionsDictionary = _.groupBy(sortedLessonsBySectionId, "section.title");

      const sections: ICourseSection[] = Object.keys(sectionsDictionary).map((sectionTitle) => ({
        title: sectionTitle,
        lessons: _.sortBy(sectionsDictionary[sectionTitle], "order"),
      }));

      Logger.debug(this.LOG_TAG, `Section Lessons found for course: ${courseId}`, sections);

      return sections;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting lessons for course: ${courseId}`, error);
      return Promise.reject(error);
    }
  }

  public async getLessonById(lessonId: string): Promise<ILesson> {
    Logger.debug(this.LOG_TAG, `Getting lesson by id: ${lessonId}`);

    try {
      const lesson = FirestoreService.getDocumentById(FirebaseCollections.LESSONS, lessonId);

      if (!lesson) {
        Logger.error(this.LOG_TAG, `Lesson not found by id: ${lessonId}`);
        return Promise.reject("Lesson not found");
      }

      Logger.debug(this.LOG_TAG, `Lesson found by id: ${lessonId}`, lesson);

      return lesson as Promise<ILesson>;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getBaseCourse(): Promise<ICourse> {
    return this.defaultCourse;
  }
}

export default new CourseManager();
