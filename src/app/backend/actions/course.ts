"use server";

import CourseManager from "../business/course/CourseManager";
import { ICourse } from "@/app/backend/business/course/CourseData";

export async function getDefaultCourse() {
  return await CourseManager.getCourseById(CourseManager.defaultCourseId);
}

export async function fetchCourses(): Promise<ICourse[]> {
  return await CourseManager.getAllCourses();
}
