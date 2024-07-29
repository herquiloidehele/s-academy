import { create } from "zustand";
import Logger from "@/utils/Logger";
import { ICourse, ICourseDto, ILesson, IModule } from "@/app/backend/business/course/CourseData";
import React from "react";
import { fetchCoursesByTutorsID, saveCourse } from "@/app/backend/actions/course";
import { z } from "zod";
import { courseBasicInformationformSchema } from "@/app/tutor/products/courses/components/CourseSchemas";
import { IOptionType } from "@/components/multi-selector/MultiSelect";

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
var categoriesOptions = [
  { label: "Tecnologia", value: "technology" },
  { label: "Negócios", value: "business" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Fotografia", value: "photography" },
  { label: "Escrita", value: "writing" },
  { label: "Línguas", value: "language" },
  { label: "Música", value: "music" },
  { label: "Desenvolvimento Pessoal", value: "personal-development" },
  { label: "Gestão de Projetos", value: "project-management" },
  { label: "Programação", value: "programming" },
  { label: "Data Science", value: "data-science" },
  { label: "Inteligência Artificial", value: "artificial-intelligence" },
  { label: "Finanças", value: "finance" },
  { label: "Gestão de Recursos Humanos", value: "human-resources" },
  { label: "Saúde e Bem-Estar", value: "health-wellness" },
  { label: "Nutrição", value: "nutrition" },
  { label: "Culinária", value: "cooking" },
  { label: "Artesanato", value: "crafts" },
  { label: "Moda", value: "fashion" },
  { label: "Psicologia", value: "psychology" },
  { label: "Educação Infantil", value: "early-childhood-education" },
  { label: "Ensino de Matemática", value: "mathematics" },
  { label: "Ensino de Ciências", value: "sciences" },
  { label: "Direito", value: "law" },
  { label: "Engenharia", value: "engineering" },
  { label: "Arquitetura", value: "architecture" },
  { label: "Turismo e Hospitalidade", value: "tourism-hospitality" },
  { label: "Empreendedorismo", value: "entrepreneurship" },
  { label: "Ciências Sociais", value: "social-sciences" },
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
  courseDto: ICourseDto;
  categoriesOptions: IOptionType[];
  currentFormStep: IFormStep;
  lessons: ILesson[];
  modules: IModule[];
  selectedCategories: IOptionType[];
  setSelectedSelectedCategories: (categories: IOptionType[]) => void;
  setCurrentFormStep: (step: IFormStep) => void;
  setCoursesByTeacherId: (id: string) => Promise<void>;
  saveCourse: (course: ICourseDto) => Promise<void>;
  saveCourseDtoInfo: (course: z.infer<typeof courseBasicInformationformSchema>) => void;
}

const useCourseStore = create<ICourseStoreState>((set) => ({
  courses: [],
  currentFormStep: {},
  lessons: [],
  modules: moduleList,
  courseDto: {} as ICourseDto,
  selectedCategories: [],
  categoriesOptions: categoriesOptions,
  setSelectedSelectedCategories: (categories: IOptionType[]) => {
    set({ selectedCategories: categories });
  },
  setCurrentFormStep: (step: IFormStep) => {
    set({ currentFormStep: step });
  },
  setCoursesByTeacherId: async (id: string) => {
    try {
      const response = await fetchCoursesByTutorsID(id);
      const courses = response as ICourse[];
      set((state) => {
        return { ...state, courses: courses || ([] as ICourse[]) };
      });
    } catch (error) {
      Logger.error("CourseStore", "Error fetching courses", error);
    }
  },

  saveCourse: async (course: ICourseDto) => {
    try {
      const response = await saveCourse(course);
      const newCourse = response as ICourse;
      set((state) => {
        return { ...state, courses: [...state.courses, newCourse] };
      });
    } catch (error) {
      Logger.error("CourseStore", "Error saving course", error);
    }
  },

  saveCourseDtoInfo: (course: courseBasicInformationformSchema) => {
    set((state) => {
      return { ...state, courseDto: { ...state.courseDto, ...course } };
    });
  },
}));

export default useCourseStore;
