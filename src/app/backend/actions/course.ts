"use server";

import CourseManager from "../business/course/CourseManager";

export async function getDefaultCourse() {
  return await CourseManager.getCourseById(CourseManager.defaultCourseId);
}
