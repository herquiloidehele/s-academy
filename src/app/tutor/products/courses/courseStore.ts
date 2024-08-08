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
  deleteCourse,
  deleteLesson,
  deleteModule,
  fetchCoursesByTutorsID,
  getCourseById,
  saveCourse,
  saveLesson,
  saveModule,
  unpublishCourse,
  updateCourse,
  updateLesson,
  updateModule,
} from "@/app/backend/actions/course";
import { IOptionType } from "@/components/multi-selector/MultiSelect";
import FirebaseClientService from "@/app/backend/services/FirebaseClientService";
import VideoManager, { IUploadResponse } from "@/app/backend/business/course/VideoManager";
import useTutorStore from "@/app/tutor/tutorStore";
import { useGlobalStore } from "@/app/globalStore";

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
  pageLoading: boolean;
  error: string;
  videoUploadPercentage: number;
  setVideoUploadPercentage: (value: number) => void;
  setPageLoading: (value: boolean) => void;
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
  updateLessonWithNewModule: (lesson: ILessonDto) => void;
  removeLesson: (lesson: ILesson, moduleId: string, removeVideoData?: boolean, removeMaterialData?: boolean) => void;
  updateLesson: (lesson: ILessonDto, oldData: ILessonDto) => void;
  resetCourseFormData: () => void;
  canCourseBePublished: () => boolean;
  unpublishCourse: (courseId: string) => void;
  removeCourse: (courseId: string) => void;
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
  canCourseBePublished: () => {
    return (
      useCourseStore.getState?.().courseDto?.modules?.length > 0 &&
      useCourseStore.getState?.().courseDto?.modules?.some((mod) => mod.lessons && mod.lessons.length > 0)
    );
  },
  setPageLoading: (value: boolean) => {
    set({ pageLoading: value });
  },
  removeCourse: async (courseId: string) => {
    useGlobalStore.getState?.().setLoading(true);
    try {
      await deleteCourse(courseId);
      useGlobalStore.getState?.().setLoading(false);
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  unpublishCourse: async (courseId: string) => {
    useGlobalStore.getState?.().setLoading(true);
    try {
      await unpublishCourse(courseId);
      useGlobalStore.getState?.().setLoading(false);
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  addModule: async (module: IModuleDto) => {
    useGlobalStore.getState?.().setLoading(true);
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
      }));
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  setVideoUploadPercentage: (value: number) => {
    set({ videoUploadPercentage: value });
  },
  updateModule: async (module: IModuleDto) => {
    try {
      const courseDto = useCourseStore.getState?.().courseDto;
      const updatedModule = await updateModule(courseDto?.id!, module.id!, module);

      const updatedModules = Array.isArray(courseDto?.modules)
        ? courseDto?.modules.map((m) => (m.id === updatedModule.id ? { ...updatedModule, lessons: m.lessons } : m))
        : [];

      set({
        courseDto: { ...courseDto, modules: updatedModules },
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  removeModule: async (moduleId: string) => {
    try {
      const courseDto = useCourseStore.getState?.().courseDto;

      await deleteModule(courseDto?.id!, moduleId);
      const updatedModules = Array.isArray(courseDto?.modules)
        ? courseDto?.modules.filter((module) => module.id !== moduleId)
        : [];

      set({
        courseDto: { ...courseDto, modules: updatedModules },
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  updateLessonWithNewModule: async (newLessonData: ILessonDto) => {
    useGlobalStore.getState?.().setLoading(true);

    const courseDto = useCourseStore.getState?.().courseDto;

    try {
      let uploadedVideo = {
        videoId: !(newLessonData.videoFile instanceof File) ? newLessonData.videoFile || 0 : 0,
        thumbnailUrl: newLessonData.thumbnailUrl,
      };

      if (newLessonData.videoFile instanceof File) {
        uploadedVideo = await VideoManager.uploadVideoFile(
          newLessonData.videoFile!,
          (percentage) => {
            useCourseStore.getState?.().setVideoUploadPercentage(percentage);
          },
          newLessonData.title,
        );
      }

      newLessonData.videoRef = uploadedVideo.videoId;
      newLessonData.thumbnailUrl = uploadedVideo.thumbnailUrl;

      if (newLessonData.materialFile instanceof File) {
        newLessonData.materialUrl = await FirebaseClientService.uploadFile(newLessonData.materialFile);
      } else {
        newLessonData.materialUrl = newLessonData.materialUrl || "";
      }
      const plainLesson = JSON.parse(
        JSON.stringify({
          ...newLessonData,
        }),
      ) as ILessonDto;
      await saveLesson(courseDto?.id!, newLessonData.moduleId, plainLesson);
      const updatedCourse = await getCourseById(courseDto?.id!);

      set({
        courseDto: { ...updatedCourse },
        progress: 0,
        videoUploadPercentage: 0,
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  addLesson: async (lesson: ILessonDto) => {
    try {
      useGlobalStore.getState?.().setLoading(true);

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
          thumbnailUrl: videoLesson.thumbnailUrl,
          materialUrl: materialUrl,
        }),
      ) as ILessonDto;
      const savedLesson = await saveLesson(courseDto?.id!, lesson.moduleId, plainLesson);

      const updatedCourse = await getCourseById(courseDto?.id!);

      set({
        courseDto: { ...updatedCourse },
        progress: 0,
        videoUploadPercentage: 0,
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  updateLesson: async (newLessonData: ILessonDto, oldData: ILesson) => {
    useGlobalStore.getState?.().setLoading(true);

    if (newLessonData.moduleId !== oldData.moduleId) {
      let removeVideo = newLessonData.videoFile instanceof File;
      let removeMaterial = newLessonData.materialFile instanceof File;
      await useCourseStore.getState?.().removeLesson(oldData, oldData.moduleId, removeVideo, removeMaterial);
      await useCourseStore.getState?.().updateLessonWithNewModule({
        ...newLessonData,
        thumbnailUrl: oldData.thumbnailUrl,
        materialUrl: oldData.materialUrl,
      });
    } else {
      try {
        const courseDto = useCourseStore.getState?.().courseDto;
        newLessonData.materialUrl = oldData?.materialUrl || "";

        let uploadedVideo: IUploadResponse = {
          videoId: oldData.videoRef || 0,
          thumbnailUrl: oldData.thumbnailUrl || "",
        };

        if (newLessonData.videoFile instanceof File) {
          uploadedVideo = await VideoManager.uploadVideoFile(
            newLessonData.videoFile!,
            (percentage) => {
              useCourseStore.getState?.().setVideoUploadPercentage(percentage);
            },
            newLessonData.title,
          );
          try {
            await VideoManager.deleteVideoById(oldData.videoRef);
          } catch (error) {
            set({ error: `Erro ao apagar o video: ${error.message}` });
          }
        }
        newLessonData.videoRef = uploadedVideo.videoId;
        newLessonData.thumbnailUrl = uploadedVideo.thumbnailUrl;

        if (newLessonData.materialFile instanceof File) {
          newLessonData.materialUrl = await FirebaseClientService.uploadFile(newLessonData.materialFile);
        }

        const plainLesson = JSON.parse(JSON.stringify(newLessonData)) as ILessonDto;
        const updatedLesson = await updateLesson(courseDto?.id!, newLessonData.moduleId, newLessonData.id, plainLesson);

        const updatedCourse = await getCourseById(courseDto?.id!);

        set({
          courseDto: { ...updatedCourse },
        });
      } catch (error) {
        useGlobalStore.getState?.().setError(error.message);
      } finally {
        useGlobalStore.getState?.().setLoading(false);
      }
    }
  },
  removeLesson: async (lesson: ILesson, moduleId: string, removeVideoData = true, removeMaterialData = true) => {
    useGlobalStore.getState?.().setLoading(false);

    const courseDto = useCourseStore.getState?.().courseDto;

    try {
      await deleteLesson(courseDto?.id!, moduleId, lesson.id);
      try {
        if (removeVideoData) await VideoManager.deleteVideoById(lesson.videoRef);
      } catch (error) {
        set({ error: `Erro ao apagar o video: ${error.message}` });
      }
      const updatedModules = courseDto?.modules?.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons?.filter((l) => l.id !== lesson.id);
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      set({
        courseDto: { ...courseDto, modules: updatedModules },
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
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
    useGlobalStore.getState?.().setLoading(true);
    try {
      await useTutorStore.getState?.().setLoggedTutor();
      const loggedTutor = useTutorStore.getState?.().loggedTutor;
      const response = await fetchCoursesByTutorsID(loggedTutor?.id!);
      const courses = response as ICourse[];
      set((state) => ({ ...state, courses: courses || [] }));
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  saveCourse: async (courseNewData: ICourseDto) => {
    try {
      await useTutorStore.getState?.().setLoggedTutor();
      const loggedTutor = useTutorStore.getState?.().loggedTutor;

      if (!loggedTutor) {
        throw new Error("Tutor data is missing");
      }
      useGlobalStore.getState?.().setLoading(true);

      const courseDto = useCourseStore.getState?.().courseDto;
      courseNewData = {
        ...courseNewData,
        tutorId: loggedTutor?.id,
        coverUrl: courseDto?.coverUrl,
        promoVideoRef: courseDto?.promoVideoRef,
        promoVideoThumbnail: courseDto?.promoVideoThumbnail,
      };

      if (!courseDto) {
        throw new Error("Course data is missing");
      }

      if (courseNewData.coverFile instanceof File) {
        courseNewData.coverUrl = await FirebaseClientService.uploadFile(courseNewData.coverFile);
      }

      let uploadedVideo: IUploadResponse = {
        videoId: courseNewData.promoVideoRef || 0,
        thumbnailUrl: courseNewData.promoVideoThumbnail || "",
      };

      if (courseNewData.promoVideoFile instanceof File) {
        uploadedVideo = await VideoManager.uploadVideoFile(
          courseNewData.promoVideoFile!,
          (percentage) => {
            useCourseStore.getState?.().setVideoUploadPercentage(percentage);
          },
          courseNewData.title,
        );
      }

      const plainCourseDto = JSON.parse(
        JSON.stringify({
          ...courseNewData,
          status: COURSE_STATUS.DRAFT,
          promoVideoRef: uploadedVideo.videoId,
          promoVideoThumbnail: uploadedVideo.thumbnailUrl,
        }),
      ) as ICourseDto;

      const response = await saveCourse(plainCourseDto);

      set({ courseDto: response, videoUploadPercentage: 0 });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },

  updateCourse: async (newCourseData: ICourseDto) => {
    try {
      useGlobalStore.getState?.().setLoading(true);
      await useTutorStore.getState?.().setLoggedTutor();
      const loggedTutor = useTutorStore.getState?.().loggedTutor;

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

      if (newCourseData.promoVideoFile instanceof File) {
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
          promoVideoRef: uploadedVideo.videoId,
          promoVideoThumbnail: uploadedVideo.thumbnailUrl,
        }),
      ) as ICourseDto;

      const response = await updateCourse(plainCourseDto);

      set({
        courseDto: { ...plainCourseDto, id: response.id, modules: oldCourseData.modules },
        videoUploadPercentage: 0,
      });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },

  publishCourse: async () => {
    useGlobalStore.getState?.().setLoading(true);
    try {
      useGlobalStore.getState?.().setLoading(true);
      const courseDto = useCourseStore.getState?.().courseDto;

      if (!courseDto) {
        throw new Error("Course data is missing");
      }

      const response = await updateCourse({ ...courseDto, status: COURSE_STATUS.PUBLISHED });

      set({ courseDto: response });
    } catch (error) {
      useGlobalStore.getState?.().setError(error.message);
    } finally {
      useGlobalStore.getState?.().setLoading(false);
    }
  },
  resetCourseFormData: () => {
    set({
      courseDto: {} as ICourseDto,
    });
  },
  setCourseDtoData: async (id: string) => {
    useGlobalStore.getState?.().setLoading(true);

    const course = await getCourseById(id);

    set((state) => ({ ...state, courseDto: course }));
  },
}));

export const courseSelectors = {
  progressPercentage: (state) => state.videoUploadPercentage,
};

export default useCourseStore;
