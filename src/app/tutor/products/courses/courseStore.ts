import { create } from "zustand";
import Logger from "@/utils/Logger";
import {
  COURSE_STATUS,
  ICourse,
  ICourseDto,
  ILesson,
  ILessonDto,
  IModule,
  IModuleDto,
} from "@/app/backend/business/course/CourseData";
import {
  deleteLesson,
  fetchCoursesByTutorsID,
  removeModule,
  saveCourse,
  saveLesson,
  saveModule,
  updateLesson,
  updateModule,
} from "@/app/backend/actions/course";
import { IOptionType } from "@/components/multi-selector/MultiSelect";
import getAuthUser from "@/app/backend/actions/auth";
import FirebaseClientService from "@/app/backend/services/FirebaseClientService";
import VimeoClientService from "@/app/backend/services/VimeoClientService";

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
  loading: boolean;
  error: string;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedCategories: (categories: IOptionType[]) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setCurrentStepIndex: (index: number) => void;
  setCoursesByTeacherId: (id: string) => Promise<void>;
  saveCourse: (course: ICourseDto) => Promise<ICourse>;
  saveCourseDtoInfo: (course: ICourseDto) => void;
  addModule: (module: IModuleDto) => void;
  removeModule: (module: IModuleDto) => void;
  updateModule: (module: IModuleDto) => void;
  addLesson: (lesson: ILessonDto) => void;
  removeLesson: (lessonId: string, moduleId: string) => void;
  updateLesson: (lesson: ILessonDto) => void;
  canCourseBeSaved: boolean;
  setCanCourseBeSaved: (value: boolean) => void;
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
  canCourseBeSaved: false,
  loading: false,
  error: "",
  setLoading: (value: boolean) => {
    set({ loading: value });
  },
  setError: (value: string) => {
    set({ error: value });
  },
  addModule: async (module: IModuleDto) => {
    set({ loading: true });
    try {
      const courseDto = useCourseStore.getState?.().courseDto;
      if (!courseDto) throw new Error("No courseDto found");

      Logger.debug("CourseStore", "Adding module", courseDto);

      const savedModule = await saveModule(courseDto.id!, module);

      Logger.debug("CourseStore", "Saved module", savedModule);

      let updatedModules = [];
      if ("modules" in courseDto) {
        updatedModules = Array.isArray(courseDto.modules) ? [...courseDto.modules, savedModule] : [savedModule];
      } else {
        updatedModules = [savedModule];
      }

      set((state) => ({
        courseDto: { ...state.courseDto, modules: updatedModules },
        canCourseBeSaved:
          updatedModules.length > 0 && updatedModules.some((mod) => mod.lessons && mod.lessons.length > 0),
      }));
    } catch (error) {
      Logger.error("CourseStore", "Unexpected error", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  updateModule: async (module: IModuleDto) => {
    const courseDto = useCourseStore.getState?.().courseDto;
    const updatedModule = await updateModule(courseDto?.id!, module.id!, module);

    const updatedModules = Array.isArray(courseDto?.modules)
      ? courseDto?.modules.map((m) => (m.id === updatedModule.id ? updatedModule : m))
      : [];

    set({
      courseDto: { ...courseDto, modules: updatedModules },
      canCourseBeSaved:
        updatedModules?.length > 0 && updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
    });
  },
  removeModule: async (moduleId: string) => {
    const courseDto = useCourseStore.getState?.().courseDto;

    await removeModule(courseDto?.id!, moduleId);
    const updatedModules = Array.isArray(courseDto?.modules)
      ? courseDto?.modules.filter((module) => module.id !== moduleId)
      : [];

    set({
      courseDto: { ...courseDto, modules: updatedModules },
      canCourseBeSaved:
        updatedModules?.length > 0 && updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
    });
  },
  addLesson: async (lesson: ILessonDto) => {
    try {
      set({ loading: true });

      const courseDto = useCourseStore.getState?.().courseDto;

      const videoLesson = await VimeoClientService.uploadVideo(lesson.videoFile!, lesson.title);
      const materialUrl = await FirebaseClientService.uploadFile(lesson.materialFile!);

      const plainLesson = JSON.parse(
        JSON.stringify({
          ...lesson,
          videoRef: videoLesson.videoId,
          materialUrl: materialUrl,
        }),
      ) as ILessonDto;
      const savedLesson = await saveLesson(courseDto?.id!, lesson.moduleId, plainLesson);

      const updatedModules = courseDto?.modules?.map((module) => {
        if (module.id === savedLesson.moduleId) {
          const updatedLessons = Array.isArray(module.lessons) ? [...module.lessons, savedLesson] : [savedLesson];
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      set({
        courseDto: { ...courseDto, modules: updatedModules },
        canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
      });
    } catch (e) {
      Logger.error("CourseStore", "Unexpected error", e);
    } finally {
      set({ loading: false });
    }
  },
  updateLesson: async (lesson: ILessonDto) => {
    await set(async (state: ICourseStoreState) => {
      const { courseDto } = state;
      const updatedLesson = await updateLesson(courseDto?.id!, lesson.moduleId, lesson.id, lesson);

      const updatedModules = courseDto?.modules?.map((module) => {
        if (module.id === updatedLesson.moduleId) {
          const updatedLessons = module.lessons?.map((l) => (l.id === updatedLesson.id ? updatedLesson : l));
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return {
        courseDto: { ...courseDto, modules: updatedModules },
        canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
      };
    });
  },
  removeLesson: (lessonId: string, moduleId: string) => {
    set(async (state: ICourseStoreState) => {
      const { courseDto } = state;

      await deleteLesson(courseDto?.id!, moduleId, lessonId);
      const updatedModules = courseDto?.modules?.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons?.filter((lesson) => lesson.id !== lessonId);
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });

      return {
        courseDto: { ...courseDto, modules: updatedModules },
        canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
      };
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
      const loggedTutor = await getAuthUser();

      set((state) => ({ ...state, loading: true, courseDto: { ...course, tutorId: loggedTutor?.id } as ICourseDto }));
      const courseDto = useCourseStore.getState?.().courseDto;

      if (!courseDto) {
        throw new Error("Course data is missing");
      }

      const coverUrl = await FirebaseClientService.uploadFile(courseDto.coverFile!);
      const plainCourseDto = JSON.parse(
        JSON.stringify({ ...courseDto, status: COURSE_STATUS.DRAFT, coverUrl }),
      ) as ICourseDto;

      const response = await saveCourse(plainCourseDto);

      Logger.debug("CourseStore", "Course saved response", response);
      set({ courseDto: response, loading: false });
    } catch (error) {
      Logger.error("CourseStore", "Unexpected error", error);
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  saveCourseDtoInfo: (course: ICourseDto) => {
    Logger.debug("CourseStore", "Saving course info", course);
    set((state) => ({ ...state, courseDto: course, loading: false }));
  },
  setCanCourseBeSaved: (value: boolean) => {
    set({ canCourseBeSaved: value });
  },
}));

export default useCourseStore;
