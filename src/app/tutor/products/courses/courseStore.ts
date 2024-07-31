import { create } from "zustand";
import Logger from "@/utils/Logger";
import {
  ICourse,
  ICourseDto,
  ILesson,
  ILessonDto,
  IModule,
  IModuleDto,
} from "@/app/backend/business/course/CourseData";
import { fetchCoursesByTutorsID, saveCourse } from "@/app/backend/actions/course";
import { IOptionType } from "@/components/multi-selector/MultiSelect";

const moduleList = [
  // ... (seu conteúdo de moduleList aqui)
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
  courseDto: ICourseDto | null;
  categoriesOptions: IOptionType[];
  currentFormStep: IFormStep;
  lessons: ILesson[];
  modules: IModule[];
  selectedCategories: IOptionType[];
  setSelectedCategories: (categories: IOptionType[]) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setCurrentStepIndex: (index: number) => void;
  setCoursesByTeacherId: (id: string) => Promise<void>;
  saveCourse: (course: ICourseDto) => Promise<void>;
  saveCourseDtoInfo: (course: ICourseDto) => void;
  addModule: (module: IModuleDto) => void;
  removeModule: (module: IModuleDto) => void;
  updateModule: (module: IModuleDto) => void;
  addLesson: (lesson: ILessonDto) => void;
  removeLesson: (lessonId: string) => void;
  updateLesson: (lesson: ILessonDto) => void;
}

const useCourseStore = create<ICourseStoreState>((set) => ({
  courses: [],
  courseDto: null,
  currentFormStep: {} as IFormStep,
  lessons: [],
  modules: moduleList,
  selectedCategories: [],
  categoriesOptions: categoriesOptions,
  currentStepIndex: 0,
  addModule: (module: IModuleDto) => {
    set((state: ICourseStoreState) => {
      const { courseDto } = state;
      let updatedModules = [];
      if ("modules" in courseDto) {
        updatedModules = Array.isArray(courseDto.modules) ? [...courseDto.modules, module] : [module];
      } else {
        updatedModules = [module];
      }

      return {
        courseDto: { ...courseDto, modules: updatedModules },
      };
    });
  },
  updateModule: (module: IModuleDto) => {
    set((state: ICourseStoreState) => {
      const { courseDto } = state;
      const updatedModules = Array.isArray(courseDto?.modules)
        ? courseDto?.modules.map((m) => (m.id === module.id ? module : m))
        : [];

      return {
        courseDto: { ...courseDto, modules: updatedModules },
      };
    });
  },
  removeModule: (moduleId: string) => {
    set((state: ICourseStoreState) => {
      const { courseDto } = state;

      const updatedModules = Array.isArray(courseDto?.modules)
        ? courseDto?.modules.filter((module) => module.id !== moduleId)
        : [];

      return {
        courseDto: { ...courseDto, modules: updatedModules },
      };
    });
  },
  addLesson: (lesson: ILessonDto) => {
    set((state: ICourseStoreState) => {
      const { courseDto } = state;

      const updatedModules = courseDto?.modules?.map((module) => {
        if (module.id === lesson.moduleId) {
          const updatedLessons = Array.isArray(module.lessons) ? [...module.lessons, lesson] : [lesson];
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      return {
        courseDto: { ...courseDto, modules: updatedModules },
      };
    });
  },
  updateLesson: (lesson: ILessonDto) => {
    set((state: ICourseStoreState) => {
      const { lessons } = state;
      const updatedLessons = lessons.map((l) => (l.id === lesson.id ? lesson : l));
      return { lessons: updatedLessons };
    });
  },
  removeLesson: (lessonId: string) => {
    set((state: ICourseStoreState) => {
      const { lessons } = state;
      const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonId);
      return { lessons: updatedLessons };
    });
  },
  goToNextStep: () => {
    set((state) => {
      if (state.currentStepIndex < 2) {
        return { currentStepIndex: state.currentStepIndex + 1 };
      }
    });
  },
  goToPreviousStep: () => {
    set((state) => {
      if (state.currentStepIndex > 0) {
        return { currentStepIndex: state.currentStepIndex - 1 };
      }
    });
  },
  setCurrentStepIndex: (index: number) => {
    set({ currentStepIndex: index });
  },
  setSelectedCategories: (categories: IOptionType[]) => {
    set({ selectedCategories: categories });
  },
  setCurrentFormStep: (step: IFormStep) => {
    set({ currentFormStep: step });
  },
  setCoursesByTeacherId: async (id: string) => {
    try {
      const response = await fetchCoursesByTutorsID(id);
      const courses = response as ICourse[];
      set((state) => ({ ...state, courses: courses || [] }));
    } catch (error) {
      Logger.error("CourseStore", "Error fetching courses", error);
    }
  },
  saveCourse: async (course: ICourseDto) => {
    try {
      const response = await saveCourse(course);
      const newCourse = response as ICourse;
      set((state) => ({ ...state, courses: [...state.courses, newCourse] }));
    } catch (error) {
      Logger.error("CourseStore", "Error saving course", error);
    }
  },
  saveCourseDtoInfo: (course: ICourseDto) => {
    set((state) => ({
      courseDto: state.courseDto ? { ...state.courseDto, ...course, modules: [] } : (course as ICourseDto),
    }));
  },
}));

export default useCourseStore;
