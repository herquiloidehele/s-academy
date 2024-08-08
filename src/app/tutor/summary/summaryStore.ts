import create from "zustand";
import { ICourse } from "@/app/backend/business/course/CourseData";
import useTutorStore from "@/app/tutor/tutorStore";
import { getTutorSubscriptionsByTutorId } from "@/app/backend/actions/course";
import useCourseStore from "@/app/tutor/products/courses/courseStore";

export interface ICourseStats {
  course: ICourse;
  students: number;
  revenue: number;
}
export interface ICourseSummary {
  id: string;
  name: string;
  students: number;
  price: number;
  totalRevenue: number;
}
interface SummaryStoreState {
  courseStats: ICourseStats[];
  setCourseStats: (stats: ICourseStats[]) => void;
  fetchCourseStatsByCurrentTutorId: () => Promise<void>;
}

export const useSummaryStore = create<SummaryStoreState>((set) => ({
  courseStats: [],

  setCourseStats: (stats) => set({ courseStats: stats }),

  fetchCourseStatsByCurrentTutorId: async () => {
    try {
      const loggedTutor = useTutorStore.getState?.().loggedTutor;
      if (!loggedTutor) {
        console.error("No logged tutor found");
        return;
      }
      const response = await getTutorSubscriptionsByTutorId(loggedTutor.id!);
      set({ courseStats: response });
    } catch (error) {
      console.error("Error fetching course stats:", error);
      useCourseStore.getState?.().setError("Ocorreu um erro ao buscar as estatísticas dos cursos");
      set({ courseStats: [] });
    }
  },
}));
