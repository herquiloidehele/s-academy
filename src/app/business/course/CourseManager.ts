import { ICourse, ILesson, IModule } from "@/app/business/course/CourseData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";

class CourseManager {
  private readonly DEFAULT_COURSE_ID = "Q0us6qiWzX00sF2IZyQL";

  private defaultCourse: ICourse = {
    id: this.DEFAULT_COURSE_ID,
    title: "Shopify - Curso completo",
    price: 4500,
    description: "Curso completo de Shopify",
    duration: "4 semanas",
    discount: 1500,
    modules: [],
  };

  private readonly LOG_TAG = "CourseManager";

  public getDefaultCourse() {
    return this.defaultCourse;
  }

  public getTotalPrice(course: ICourse) {
    return course.price - course.discount;
  }

  public async getCourseModules(courseId: string): Promise<IModule[]> {
    Logger.debug(this.LOG_TAG, `Getting lessons for course: ${courseId}`);

    try {
      const courseModules: IModule[] = await FirestoreService.getDocumentSubCollection<IModule>(
        FirebaseCollections.COURSES,
        courseId,
        FirebaseCollections.MODULES,
      );

      Logger.debug(this.LOG_TAG, `Section Lessons found for course: ${courseId}`, [courseModules]);

      return courseModules;
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

  public async getModuleById(moduleId: string, courseId: string): Promise<IModule> {
    Logger.debug(this.LOG_TAG, `Getting module by id:`, [moduleId, courseId]);

    try {
      const courseModule: any = await FirestoreService.getDocumentById(
        FirebaseCollections.MODULES.replace("{courseId}", courseId),
        moduleId,
      );

      if (!courseModule) {
        Logger.error(this.LOG_TAG, `Module not found by id: ${moduleId}`);
        return Promise.reject("Module not found");
      }

      Logger.debug(this.LOG_TAG, `Module found by id: ${moduleId}`, courseModule);

      return {
        ...courseModule,
        id: moduleId,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async addLessonToModule(lesson: ILesson, courseId: string, moduleId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, `Adding lesson to module:`, [lesson, moduleId, courseId]);

    try {
      const lessonCollectionName = FirebaseCollections.LESSONS.replace("{courseId}", courseId).replace(
        "{moduleId}",
        moduleId,
      );

      const hasLesson = await FirestoreService.getDocumentById(lessonCollectionName, lesson.id);

      if (hasLesson) {
        Logger.warn(this.LOG_TAG, `Lesson already exists in module:`, [hasLesson, lessonCollectionName]);
        return;
      }

      await FirestoreService.saveDocument(lessonCollectionName, lesson, lesson.id);

      Logger.debug(this.LOG_TAG, `Lesson added to module:`, [lesson, moduleId, courseId]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error adding lesson to module:`, [lesson, moduleId, courseId]);
      return Promise.reject(error);
    }
  }

  public async getBaseCourse(): Promise<ICourse> {
    return this.defaultCourse;
  }
}

export default new CourseManager();
