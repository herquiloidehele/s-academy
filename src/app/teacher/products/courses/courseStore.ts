import { create } from "zustand";
import Logger from "@/utils/Logger";
import { ICourse, ILesson, IModule } from "@/app/backend/business/course/CourseData";
import React from "react";

var moduleList = [
  {
    id: "module1",
    order: 1,
    title: "Introduction to Web Development",
    courseId: "course1",
    description: "An introductory module to the basics of web development.",
    lessons: [
      {
        id: "lesson1",
        order: 1,
        videoRef: 101,
        title: "What is Web Development?",
        moduleId: "module1",
        duration: "15:30",
        description: "An overview of web development and its importance.",
        thumbnailUrl: "https://example.com/thumbnails/lesson1.jpg",
      },
      {
        id: "lesson2",
        order: 2,
        videoRef: 102,
        title: "HTML Basics",
        moduleId: "module1",
        duration: "20:45",
        description: "Introduction to HTML and how to structure a webpage.",
        thumbnailUrl: "https://example.com/thumbnails/lesson2.jpg",
      },
    ],
  },
  {
    id: "module2",
    order: 2,
    title: "CSS for Styling",
    courseId: "course1",
    description: "Learn how to style websites using CSS.",
    lessons: [
      {
        id: "lesson3",
        order: 1,
        videoRef: 201,
        title: "CSS Basics",
        moduleId: "module2",
        duration: "18:00",
        description: "Introduction to CSS and how to style basic HTML elements.",
        thumbnailUrl: "https://example.com/thumbnails/lesson3.jpg",
      },
      {
        id: "lesson4",
        order: 2,
        videoRef: 202,
        title: "Advanced CSS Techniques",
        moduleId: "module2",
        duration: "25:15",
        description: "Exploring more advanced CSS techniques for layout and design.",
        thumbnailUrl: "https://example.com/thumbnails/lesson4.jpg",
      },
    ],
  },
  {
    id: "module3",
    order: 3,
    title: "JavaScript for Interactivity",
    courseId: "course1",
    description: "Learn JavaScript to make your websites interactive.",
    lessons: [
      {
        id: "lesson5",
        order: 1,
        videoRef: 301,
        title: "JavaScript Basics",
        moduleId: "module3",
        duration: "22:30",
        description: "Introduction to JavaScript and how to add interactivity to your site.",
        thumbnailUrl: "https://example.com/thumbnails/lesson5.jpg",
      },
      {
        id: "lesson6",
        order: 2,
        videoRef: 302,
        title: "DOM Manipulation",
        moduleId: "module3",
        duration: "30:00",
        description: "Learn how to manipulate the Document Object Model (DOM) using JavaScript.",
        thumbnailUrl: "https://example.com/thumbnails/lesson6.jpg",
      },
    ],
  },
];
export interface IFormStep {
  key: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  page: React.ReactElement;
  state: boolean;
}

interface ICourseStoreState {
  courses: ICourse[];
  currentFormStep: IFormStep;
  lessons: ILesson[];
  modules: IModule[];
  setCurrentFormStep: (step: IFormStep) => void;
  setCoursesByTeacherId: (id: string) => Promise<void>;
}

const useCourseStore = create<ICourseStoreState>((set) => ({
  courses: [],
  currentFormStep: {},
  lessons: [],
  modules: moduleList,
  setCurrentFormStep: (step: IFormStep) => {
    set({ currentFormStep: step });
  },
  setLoggedUser: async () => {
    try {
      // const user = await AuthManager.getAuthUser();
      // set({ user });
    } catch (e) {
      Logger.error("useAuthStore", "Error setting logged user", [e]);
    }
  },
}));

export default useCourseStore;
