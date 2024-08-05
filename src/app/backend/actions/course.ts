"use server";

import CourseManager from "../business/course/CourseManager";
import {
  ICourse,
  ICourseDto,
  ILesson,
  ILessonDto,
  IModule,
  IModuleDto,
} from "@/app/backend/business/course/CourseData";
import VideoManager, { IUploadResponse } from "@/app/backend/business/course/VideoManager";

export async function fetchCourses(): Promise<ICourse[]> {
  return CourseManager.getAllCourses();
}
export async function getCourseById(courseId: string): Promise<ICourse> {
  return CourseManager.getCourseById(courseId);
}

export async function getCourseModules(courseId: string) {
  return CourseManager.getCourseModules(courseId);
}

export async function getSubscribedCourses() {
  return CourseManager.getSubscribedCourses();
}

export async function fetchCoursesByTutorsID(tutorId: string): Promise<ICourse[]> {
  return CourseManager.getCoursesByTutorsId(tutorId);
}

export async function saveCourse(courseDto: ICourseDto): Promise<ICourse> {
  return CourseManager.saveCourse(courseDto);
}
export async function updateCourse(courseDto: ICourseDto): Promise<ICourse> {
  return CourseManager.updateCourse(courseDto);
}

export async function saveModule(courseId: string, moduleDto: IModuleDto): Promise<IModule> {
  return CourseManager.addModuleToCourse(courseId, moduleDto);
}
export async function removeModule(courseId: string, moduleId: string): Promise<void> {
  return CourseManager.removeModule(courseId, moduleId);
}

export async function saveLesson(courseId: string, moduleId: string, lessonDto: ILessonDto): Promise<ILesson> {
  return CourseManager.addLessonToModule(lessonDto, courseId, moduleId);
}

export async function updateModule(courseId: string, moduleId: string, moduleDto: IModuleDto): Promise<IModule> {
  return CourseManager.updateModule(courseId, moduleId, moduleDto);
}

export async function updateLesson(
  courseId: string,
  moduleId: string,
  lessonId: string,
  lessonDto: ILessonDto,
): Promise<ILesson> {
  return CourseManager.updateLesson(courseId, moduleId, lessonId, lessonDto);
}

export async function deleteLesson(courseId: string, moduleId: string, lessonId: string): Promise<void> {
  return CourseManager.removeLesson(courseId, moduleId, lessonId);
}
export async function unpublishCourse(courseId: string): Promise<void> {
  return CourseManager.unpublishCourse(courseId);
}

export async function uploadVideo(file: File, onProgress: (percentage: number) => void): Promise<IUploadResponse> {
  return VideoManager.uploadVideoFile(file, onProgress);
}

export async function getVideoThumbnail(videoId: number): Promise<string> {
  return VideoManager.getVideoThumbnail(videoId);
}
