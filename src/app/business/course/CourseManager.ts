import { ICourse, ILesson, IModule } from "@/app/business/course/CourseData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/services/FirestoreService";
import { Constants, FirebaseCollections } from "@/utils/Constants";
import * as _ from "lodash";

class CourseManager {
  private readonly DEFAULT_COURSE_ID = Constants.COURSE.DEFAULT_COURSE_ID;

  private readonly LOG_TAG = "CourseManager";

  public get defaultCourseId() {
    return this.DEFAULT_COURSE_ID;
  }

  public getTotalPrice(course: ICourse) {
    return course.price - course.discount;
  }

  public async getCourseById(courseId: string): Promise<ICourse | undefined> {
    Logger.debug(this.LOG_TAG, `Getting course by id: ${courseId}`);

    try {
      const course = await FirestoreService.getDocumentById(FirebaseCollections.COURSES, courseId);

      if (!course) {
        Logger.error(this.LOG_TAG, `Course not found by id: ${courseId}`);
        return Promise.reject("Course not found");
      }

      Logger.debug(this.LOG_TAG, `Course found by id: ${courseId}`, course);

      return course as ICourse;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting course by id: ${courseId}`, error);
      return;
    }
  }

  public async getCourseModules(courseId: string): Promise<IModule[]> {
    Logger.debug(this.LOG_TAG, `Getting lessons for course: ${courseId}`);

    try {
      const courseModules: IModule[] = await FirestoreService.getDocuments<IModule>(
        `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}`,
      );

      Logger.debug(this.LOG_TAG, `Modules Lessons found for course: ${courseId}`, [courseModules]);

      const courseWithLessons = await Promise.all(
        courseModules.map(async (module) => ({
          ...module,
          order: Number(module.order),
          lessons: await this.getLessons(courseId, module.id),
        })),
      );

      const sortedModules = _.sortBy(courseWithLessons, "order");

      Logger.debug(this.LOG_TAG, `Modules Lessons sorted for course: ${courseId}`, [sortedModules]);

      return sortedModules;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting Modules for course: ${courseId}`, error);
      return [];
    }
  }

  public async getLessons(courseId: string, moduleId: string): Promise<ILesson[]> {
    Logger.debug(this.LOG_TAG, `Getting lessons for course: ${courseId}`);

    try {
      const lessons: ILesson[] = await FirestoreService.getDocuments<ILesson>(
        `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`,
      );

      Logger.debug(this.LOG_TAG, `Lessons found for course: ${courseId}`, [lessons]);

      const lessonsWithOrder = lessons.map((lesson) => ({
        ...lesson,
        order: Number(lesson.order),
      }));
      const sortedLessons = _.sortBy(lessonsWithOrder, "order");

      Logger.debug(this.LOG_TAG, `Lessons sorted for course: ${courseId}`, [sortedLessons]);
      return sortedLessons;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting Lessons for course: ${courseId}`, error);
      return [];
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
      Logger.error(this.LOG_TAG, `Error getting lesson by id: ${lessonId}`, [error]);
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
}

export default new CourseManager();
