import { create } from "zustand";
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
  getCourseById,
  removeModule,
  saveCourse,
  saveLesson,
  saveModule,
  updateCourse,
  updateLesson,
  updateModule,
} from "@/app/backend/actions/course";
import { IOptionType } from "@/components/multi-selector/MultiSelect";
import getAuthUser from "@/app/backend/actions/auth";
import FirebaseClientService from "@/app/backend/services/FirebaseClientService";
import VideoManager, { IUploadResponse } from "@/app/backend/business/course/VideoManager";

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
  videoUploadPercentage: number;
  setVideoUploadPercentage: (value: number) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setSelectedCategories: (categories: IOptionType[]) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setCurrentStepIndex: (index: number) => void;
  fetchLoggedTutorCourses: () => Promise<void>;
  saveCourse: (course: ICourseDto) => Promise<ICourse>;
  updateCourse: (course: ICourseDto) => Promise<ICourse>;
  publishCourse: () => Promise<ICourse>;
  setCourseDtoData: (id: string) => void;
  addModule: (module: IModuleDto) => void;
  removeModule: (module: IModuleDto) => void;
  updateModule: (module: IModuleDto) => void;
  addLesson: (lesson: ILessonDto) => void;
  removeLesson: (lessonId: string, moduleId: string) => void;
  updateLesson: (lesson: ILessonDto) => void;
  canCourseBeSaved: boolean;
  setCanCourseBeSaved: (value: boolean) => void;
  reset: () => void;
}

const useCourseStore = create<ICourseStoreState>((set) => ({
  courses: [],
  courseDto: {} as ICourseDto,
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

      const savedModule = await saveModule(courseDto.id!, module);

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
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  setVideoUploadPercentage: (value: number) => {
    set({ videoUploadPercentage: value });
  },
  updateModule: async (module: IModuleDto) => {
    const courseDto = useCourseStore.getState?.().courseDto;
    const updatedModule = await updateModule(courseDto?.id!, module.id!, module);

    const updatedModules = Array.isArray(courseDto?.modules)
      ? courseDto?.modules.map((m) => (m.id === updatedModule.id ? { ...updatedModule, lessons: m.lessons } : m))
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

      const videoLesson = await VideoManager.uploadVideoFile(
        lesson.videoFile!,
        (percentage) => {
          useCourseStore.getState?.().setVideoUploadPercentage(percentage);
        },
        lesson.title,
      );

      const materialUrl = lesson.materialFile ? await FirebaseClientService.uploadFile(lesson.materialFile) : "";

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
        progress: 0,
        canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  updateLesson: async (lesson: ILessonDto) => {
    const courseDto = useCourseStore.getState?.().courseDto;

    const plainLesson = JSON.parse(JSON.stringify(lesson)) as ILessonDto;
    const updatedLesson = await updateLesson(courseDto?.id!, lesson.moduleId, lesson.id, plainLesson);

    let materialUrl = "";
    if (lesson.materialFile instanceof File) {
      materialUrl = lesson.materialFile ? await FirebaseClientService.uploadFile(lesson.materialFile) : "";
    }
    const updatedModules = courseDto?.modules?.map((module) => {
      if (module.id === updatedLesson.moduleId) {
        const updatedLessons = module.lessons?.map((l) =>
          l.id === updatedLesson.id ? { ...updatedLesson, materialUrl: materialUrl || l.materialUrl } : l,
        );
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });

    set({
      courseDto: { ...courseDto, modules: updatedModules },
      canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
    });
  },
  removeLesson: async (lessonId: string, moduleId: string) => {
    const courseDto = useCourseStore.getState?.().courseDto;

    await deleteLesson(courseDto?.id!, moduleId, lessonId);
    const updatedModules = courseDto?.modules?.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons?.filter((lesson) => lesson.id !== lessonId);
        return { ...module, lessons: updatedLessons };
      }
      return module;
    });
    set({
      courseDto: { ...courseDto, modules: updatedModules },
      canCourseBeSaved: updatedModules?.some((mod) => mod.lessons && mod.lessons.length > 0),
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
  fetchLoggedTutorCourses: async () => {
    set({ loading: true });
    try {
      const loggedTutor = await getAuthUser();
      const response = await fetchCoursesByTutorsID(loggedTutor?.email!);
      const courses = response as ICourse[];
      set((state) => ({ ...state, courses: courses || [] }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set((state) => ({ ...state, loading: false }));
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

      let uploadedVideo: IUploadResponse = { videoId: 0, thumbnailUrl: "" };

      if (courseDto.promoVideoFile) {
        uploadedVideo = await VideoManager.uploadVideoFile(
          courseDto.promoVideoFile!,
          (percentage) => {
            useCourseStore.getState?.().setVideoUploadPercentage(percentage);
          },
          courseDto.title,
        );
      }
      const plainCourseDto = JSON.parse(
        JSON.stringify({
          ...courseDto,
          status: COURSE_STATUS.DRAFT,
          coverUrl,
          promoVideoRef: uploadedVideo.videoId === 0 ? undefined : uploadedVideo.videoId,
          promoVideoThumbnail: uploadedVideo.thumbnailUrl,
        }),
      ) as ICourseDto;

      const response = await saveCourse(plainCourseDto);

      set({ courseDto: response, loading: false, videoUploadPercentage: 0, isLoading: false });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  updateCourse: async (newCourseData: ICourseDto) => {
    try {
      set({ loading: true });
      const loggedTutor = await getAuthUser();

      const courseId = useCourseStore.getState?.().courseDto?.id;

      if (!courseId) {
        throw new Error("Course id is missing");
      }

      const oldCourseData = useCourseStore.getState?.().courseDto;

      if (!oldCourseData) {
        throw new Error("Course data is missing");
      }

      let coverUrl = oldCourseData.coverUrl;

      if (newCourseData.coverFile instanceof File) {
        coverUrl = await FirebaseClientService.uploadFile(newCourseData.coverFile);
      }

      let uploadedVideo = {
        videoId: oldCourseData.promoVideoRef,
        thumbnailUrl: oldCourseData.promoVideoThumbnail,
      };

      if (newCourseData.promoVideoFile) {
        uploadedVideo = await VideoManager.uploadVideoFile(
          newCourseData.promoVideoFile!,
          (percentage) => {
            useCourseStore.getState?.().setVideoUploadPercentage(percentage);
          },
          newCourseData.title,
        );
      }

      const plainCourseDto = JSON.parse(
        JSON.stringify({
          ...newCourseData,
          status: COURSE_STATUS.DRAFT,
          coverUrl,
          tutorId: loggedTutor?.id,
          promoVideoRef: uploadedVideo.videoId === 0 ? undefined : uploadedVideo.videoId,
          promoVideoThumbnail: uploadedVideo.thumbnailUrl,
        }),
      ) as ICourseDto;

      const response = await updateCourse(plainCourseDto);

      console.log("response", response);
      set({ courseDto: { ...response, modules: oldCourseData.modules }, loading: false });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  publishCourse: async () => {
    set({ loading: true });
    try {
      set({ loading: true });
      const courseDto = useCourseStore.getState?.().courseDto;

      if (!courseDto) {
        throw new Error("Course data is missing");
      }

      const response = await updateCourse({ ...courseDto, status: COURSE_STATUS.PUBLISHED });

      set({ courseDto: response, loading: false });
    } catch (error) {
      set({ error: error.message });
      set({ loading: false });
    } finally {
      set({ loading: false });
      useCourseStore.getState?.().reset();
    }
  },
  reset: () => {
    set({
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
    });
  },
  setCourseDtoData: async (id: string) => {
    set({ loading: true });

    const course = await getCourseById(id);

    set((state) => ({ ...state, courseDto: course, loading: false, canCourseBeSaved: true }));
  },

  setCanCourseBeSaved: (value: boolean) => {
    set({ canCourseBeSaved: value });
  },
}));

export default useCourseStore;
