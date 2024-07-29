import {
  ICourse,
  ICourseDto,
  ILesson,
  ILessonDto,
  IModule,
  IModuleDto,
} from "@/app/backend/business/course/CourseData";
import Logger from "@/utils/Logger";
import FirestoreService from "@/app/backend/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import * as _ from "lodash";
import { CourseMock } from "@/mock/CourseMock";
import SubscriptionManager from "@/app/backend/business/subscription/SubscriptionManager";
import AuthManager from "@/app/backend/business/auth/AuthManager";
import { firestore } from "firebase-admin";
import FieldPath = firestore.FieldPath;

class CourseManager {
  private readonly LOG_TAG = "CourseManager";

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

  public async getLessonById(courseId: string, moduleId: string, lessonId: string): Promise<ILesson> {
    Logger.debug(this.LOG_TAG, `Getting lesson by id: ${lessonId}`);

    try {
      const lesson = FirestoreService.getDocumentById(
        `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`,
        lessonId,
      );

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

  // public async addLessonToModule(lesson: ILesson, courseId: string, moduleId: string): Promise<void> {
  //   Logger.debug(this.LOG_TAG, `Adding lesson to module:`, [lesson, moduleId, courseId]);
  //
  //   try {
  //     const lessonCollectionName = FirebaseCollections.LESSONS.replace("{courseId}", courseId).replace(
  //       "{moduleId}",
  //       moduleId,
  //     );
  //
  //     const hasLesson = await FirestoreService.getDocumentById(lessonCollectionName, lesson.id);
  //
  //     if (hasLesson) {
  //       Logger.warn(this.LOG_TAG, `Lesson already exists in module:`, [hasLesson, lessonCollectionName]);
  //       return;
  //     }
  //
  //     await FirestoreService.saveDocument(lessonCollectionName, lesson, lesson.id);
  //
  //     Logger.debug(this.LOG_TAG, `Lesson added to module:`, [lesson, moduleId, courseId]);
  //   } catch (error) {
  //     Logger.error(this.LOG_TAG, `Error adding lesson to module:`, [lesson, moduleId, courseId]);
  //     return Promise.reject(error);
  //   }
  // }

  public async getAllCourses(): Promise<ICourse[]> {
    Logger.debug(this.LOG_TAG, `Getting all courses`);

    try {
      const courses = await FirestoreService.getDocuments<ICourse>(FirebaseCollections.COURSES);

      Logger.debug(this.LOG_TAG, `Courses found`, [courses]);

      const mockCourses = Array.from({ length: 8 }).map(() => CourseMock);

      return [...courses, ...mockCourses];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting all courses`, error);
      return [];
    }
  }

  public async getCoursesByTutorId(tutorId: string): Promise<ICourse[]> {
    Logger.debug(this.LOG_TAG, `Getting courses by tutor ID`);

    try {
      const courses = await FirestoreService.getDocumentsByQuery<ICourse>(FirebaseCollections.COURSES, {
        field: "tutorId",
        operator: "==",
        value: tutorId,
      });

      Logger.debug(this.LOG_TAG, `Subscriptions found`, [courses]);

      if (!courses?.length) {
        return [];
      }

      return courses as ICourse[];
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting all courses`, error);
      return [];
    }
  }

  public async getSubscribedCourses(): Promise<ICourse[]> {
    Logger.debug(this.LOG_TAG, `Getting subscribed courses for user`);

    try {
      const authUser = await AuthManager.getAuthUser();

      if (!authUser) {
        Logger.error(this.LOG_TAG, `User not found by user`);
        return Promise.reject("User not found");
      }

      const subscriptions = await SubscriptionManager.getSubscriptionByUserId(authUser.id);

      Logger.debug(this.LOG_TAG, `Subscriptions found for user: ${authUser.id}`, [subscriptions]);

      const courses = await FirestoreService.getDocumentsByQuery<ICourse>(FirebaseCollections.COURSES, {
        field: FieldPath.documentId(),
        operator: "in",
        value: subscriptions.map((sub) => sub.courseId),
      });

      Logger.debug(this.LOG_TAG, `Courses found for user: ${authUser.id}`, [courses]);

      return courses;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error getting subscribed courses for user`, error);
      return [];
    }
  }
  public async saveCourse(courseDto: ICourseDto): Promise<ICourse> {
    Logger.debug(this.LOG_TAG, `Saving course:`, [courseDto]);

    try {
      // Salvar o curso
      const savedCourse = await FirestoreService.saveDocument(FirebaseCollections.COURSES, courseDto);

      if (!savedCourse) {
        Logger.error(this.LOG_TAG, `Course not saved:`, [courseDto]);
        return Promise.reject("Course not saved");
      }

      const courseId = savedCourse.id;

      // Salvar os módulos e lições
      for (const moduleDto of courseDto.modules) {
        await this.addModuleToCourse(courseId, moduleDto);
      }

      Logger.debug(this.LOG_TAG, `Course saved:`, [savedCourse]);
      return savedCourse as ICourse;
    } catch (e) {
      Logger.error(this.LOG_TAG, `Error saving course:`, [courseDto]);
      return Promise.reject(e);
    }
  }

  public async addModuleToCourse(courseId: string, moduleDto: IModuleDto): Promise<void> {
    Logger.debug(this.LOG_TAG, `Adding module to course:`, [moduleDto, courseId]);

    try {
      const moduleCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}`;
      const savedModule = await FirestoreService.saveDocument(moduleCollectionName, moduleDto);

      if (!savedModule) {
        Logger.error(this.LOG_TAG, `Module not saved:`, [moduleDto]);
        return Promise.reject("Module not saved");
      }

      const moduleId = savedModule.id;

      // Salvar as lições do módulo
      for (const lessonDto of moduleDto.lessons) {
        await this.addLessonToModule(lessonDto, courseId, moduleId);
      }

      Logger.debug(this.LOG_TAG, `Module added to course:`, [savedModule, courseId]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error adding module to course:`, [moduleDto, courseId]);
      return Promise.reject(error);
    }
  }

  public async addLessonToModule(lessonDto: ILessonDto, courseId: string, moduleId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, `Adding lesson to module:`, [lessonDto, moduleId, courseId]);

    try {
      const lessonCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`;
      await FirestoreService.saveDocument(lessonCollectionName, lessonDto);

      Logger.debug(this.LOG_TAG, `Lesson added to module:`, [lessonDto, moduleId, courseId]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error adding lesson to module:`, [lessonDto, moduleId, courseId]);
      return Promise.reject(error);
    }
  }
}

export default new CourseManager();
