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
import { undefined } from "zod";
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

    const tutorRef = await FirestoreService.getDocumentRefById(FirebaseCollections.USERS, courseDto.tutorId!);
    if (!tutorRef) throw new Error("Tutor not found");

    const courseDataObject = {
      title: courseDto.title,
      status: courseDto.status,
      price: courseDto.price,
      duration: courseDto.duration,
      discount: courseDto.discount,
      tutorId: courseDto.tutorId,
      categories: courseDto.categories || [],
      createdAt: new Date(),
      coverUrl: courseDto.coverUrl,
      description: courseDto.description,
      promoVideoRef: courseDto.promoVideoRef || 0,
      tutorRef: courseDto.tutorRef,
    };

    try {
      const savedCourse = await FirestoreService.saveDocument(FirebaseCollections.COURSES, courseDataObject);

      if (!savedCourse) {
        Logger.error(this.LOG_TAG, `Course not saved:`, [courseDataObject]);
        return Promise.reject("Course not saved");
      }

      Logger.debug(this.LOG_TAG, `Course saved:`, [savedCourse]);

      return JSON.parse(JSON.stringify(savedCourse));
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error saving course:`, [courseDataObject]);
      return Promise.reject(error);
    }
  }

  public async addModuleToCourse(courseId: string, moduleDto: IModuleDto): Promise<IModule> {
    Logger.debug(this.LOG_TAG, `Adding module to course:`, [moduleDto, courseId]);

    return new Promise(async (resolve, reject) => {
      const courseRef = await FirestoreService.getDocumentRefById(FirebaseCollections.COURSES, courseId);
      const moduleDataObject = {
        courseRef: courseRef,
        courseId: courseId,
        title: moduleDto.title,
        order: moduleDto.order,
        description: moduleDto.description,
      };

      try {
        const moduleCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}`;
        const savedModule = await FirestoreService.saveDocument(moduleCollectionName, moduleDataObject);

        if (!savedModule) {
          Logger.error(this.LOG_TAG, `Module not saved:`, [moduleDataObject]);
          return Promise.reject("Module not saved");
        }
        Logger.debug(this.LOG_TAG, `Module added to course:`, [savedModule, courseId]);

        return resolve(JSON.parse(JSON.stringify(savedModule)));
      } catch (error) {
        Logger.error(this.LOG_TAG, `Error adding module to course:`, [moduleDto, courseId]);
        return reject(error);
      }
    });
  }

  public async addLessonToModule(lessonDto: ILessonDto, courseId: string, moduleId: string): Promise<ILesson> {
    Logger.debug(this.LOG_TAG, `Adding lesson to module:`, [lessonDto, moduleId, courseId]);

    const moduleRef = await FirestoreService.getDocumentRefById(FirebaseCollections.COURSES, courseId);
    const lessonObject = {
      duration: lessonDto.duration,
      thumbnailUrl: lessonDto.thumbnailUrl,
      materialUrl: lessonDto.materialUrl,
      videoRef: lessonDto.videoRef,
      moduleId: moduleId,
      moduleRef: moduleRef,
      title: lessonDto.title,
      order: lessonDto.order,
      description: lessonDto.description,
    };

    try {
      const lessonsCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`;
      const savedLesson = await FirestoreService.saveDocument(lessonsCollectionName, lessonObject);

      if (!savedLesson) {
        Logger.error(this.LOG_TAG, `Lesson not saved:`, [lessonDto]);
        return Promise.reject("Lesson not saved");
      }
      Logger.debug(this.LOG_TAG, `Lesson added to module:`, [savedLesson, moduleId, courseId]);

      return savedLesson as ILesson;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error adding lesson to module:`, [lessonDto, moduleId, courseId]);
      return Promise.reject(error);
    }
  }

  public async updateModule(courseId: string, moduleId: string, moduleDto: IModuleDto): Promise<IModule> {
    Logger.debug(this.LOG_TAG, `Updating module in course:`, [moduleDto, moduleId, courseId]);
    const courseRef = await FirestoreService.getDocumentRefById(FirebaseCollections.COURSES, courseId);
    const moduleDataObject = {
      courseRef: courseRef,
      courseId: courseId,
      title: moduleDto.title,
      order: moduleDto.order,
      description: moduleDto.description,
    };
    try {
      const moduleCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}`;
      const updatedModule = await FirestoreService.updateDocument(moduleCollectionName, moduleId, moduleDataObject);

      if (!updatedModule) {
        Logger.error(this.LOG_TAG, `Module not updated:`, [moduleDataObject]);
        return Promise.reject("Module not updated");
      }
      Logger.debug(this.LOG_TAG, `Module updated in course:`, [updatedModule, courseId]);

      return updatedModule as IModule;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error updating module in course:`, [moduleDto, moduleId, courseId]);
      return Promise.reject(error);
    }
  }

  public async removeModule(courseId: string, moduleId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, `Removing module from course:`, [moduleId, courseId]);

    try {
      const moduleCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}`;
      await FirestoreService.deleteDocument(moduleCollectionName, moduleId);

      Logger.debug(this.LOG_TAG, `Module removed from course:`, [moduleId, courseId]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error removing module from course:`, [moduleId, courseId]);
      return Promise.reject(error);
    }
  }

  public async updateLesson(
    courseId: string,
    moduleId: string,
    lessonId: string,
    lessonDto: ILessonDto,
  ): Promise<ILesson> {
    Logger.debug(this.LOG_TAG, `Updating lesson in module:`, [lessonDto, lessonId, moduleId, courseId]);
    const moduleRef = await FirestoreService.getDocumentRefById(FirebaseCollections.COURSES, courseId);

    const lessonObject = {
      duration: lessonDto.duration,
      thumbnailUrl: lessonDto.thumbnailUrl,
      materialUrl: lessonDto.materialUrl,
      videoRef: lessonDto.videoRef,
      moduleId: moduleId,
      moduleRef: moduleRef,
      title: lessonDto.title,
      order: lessonDto.order,
      description: lessonDto.description,
    };
    try {
      const lessonsCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`;
      const updatedLesson = await FirestoreService.updateDocument(lessonsCollectionName, lessonId, lessonObject);

      Logger.debug(this.LOG_TAG, `Lesson updated in module:`, [updatedLesson, lessonId, moduleId, courseId]);

      return { id: lessonId, ...lessonDto } as ILesson;
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error updating lesson in module:`, [lessonDto, lessonId, moduleId, courseId]);
      return Promise.reject(error);
    }
  }

  public async removeLesson(courseId: string, moduleId: string, lessonId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, `Removing lesson from module:`, [lessonId, moduleId, courseId]);

    try {
      const lessonsCollectionName = `${FirebaseCollections.COURSES}/${courseId}/${FirebaseCollections.MODULES}/${moduleId}/${FirebaseCollections.LESSONS}`;
      await FirestoreService.deleteDocument(lessonsCollectionName, lessonId);

      Logger.debug(this.LOG_TAG, `Lesson removed from module:`, [lessonId, moduleId, courseId]);
    } catch (error) {
      Logger.error(this.LOG_TAG, `Error removing lesson from module:`, [lessonId, moduleId, courseId]);
      return Promise.reject(error);
    }
  }
}

export default new CourseManager();
