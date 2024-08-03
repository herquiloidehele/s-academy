import { DocumentData, DocumentReference } from "firebase/firestore";

// Interface para um curso
export interface ICourse {
  id: string;
  title: string;
  status: COURSE_STATUS;
  description?: string;
  price: number;
  duration: string;
  discount: number;
  modules: IModule[];
  coverUrl?: string;
  promoVideoRef?: number;
  categories?: string[];
  createdAt?: Date;
  tutorId: string;
  tutorRef?: DocumentReference<DocumentData> | null;
}

// DTO para um curso
export interface ICourseDto {
  id?: string;
  title?: string;
  description?: string;
  status?: COURSE_STATUS;
  price?: number;
  duration?: string;
  discount?: number;
  modules?: IModuleDto[];
  coverUrl?: string;
  coverFile?: File;
  promoVideoFile?: File;
  promoVideoRef?: number;
  categories?: string[];
  createdAt?: Date;
  tutorId?: string;
  tutorRef?: DocumentReference<DocumentData> | null;
}

// DTO para um módulo
export interface IModuleDto {
  id?: string;
  order?: number;
  title?: string;
  description?: string;
  lessons?: ILessonDto[];
  courseRef?: DocumentReference<DocumentData> | null;
}

// DTO para uma lição
export interface ILessonDto {
  id: string;
  order: number;
  videoRef?: number;
  title: string;
  moduleId: string;
  duration?: string;
  description?: string;
  thumbnailUrl?: string;
  materialUrl?: string;
  materialFile?: File;
  videoFile?: File;
  moduleRef: DocumentReference<DocumentData> | null;
}

// Interface para um módulo
export interface IModule {
  id: string;
  order: number;
  title: string;
  description?: string;
  lessons: ILesson[];
  courseId: string;
  courseRef: DocumentReference<DocumentData> | null;
}

// Interface para uma lição
export interface ILesson {
  id: string;
  order: number;
  videoRef: number;
  title: string;
  duration: string;
  description?: string;
  thumbnailUrl: string;
  materialUrl?: string;
  moduleId: string;
  moduleRef: DocumentReference<DocumentData> | null;
}

// Enum para status do curso
export enum COURSE_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DELETED = "DELETED",
}
