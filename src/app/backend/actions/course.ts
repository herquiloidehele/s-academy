"use server";

import CourseManager from "../business/course/CourseManager";
import { ICourse, ICourseDto } from "@/app/backend/business/course/CourseData";

export async function fetchCourses(): Promise<ICourse[]> {
  return CourseManager.getAllCourses();
}

export async function getCourseModules(courseId: string) {
  return CourseManager.getCourseModules(courseId);
}

export async function getSubscribedCourses() {
  return CourseManager.getSubscribedCourses();
}
export async function fetchCoursesByTutorsID(tutorId: string): Promise<ICourse[]> {
  return CourseManager.getCoursesByTutorId(tutorId);
}

export async function saveCourse(courseDto: ICourseDto): Promise<ICourse> {
  return CourseManager.saveCourse(courseDto);
}
