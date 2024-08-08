import { DocumentData, DocumentReference } from "firebase/firestore";

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
  promoVideoThumbnail?: string;
  categories?: string[];
  createdAt?: Date;
  tutorId: string;
  tutorRef?: DocumentReference<DocumentData> | null;
}

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
  promoVideoThumbnail?: string;
  categories?: string[];
  createdAt?: Date;
  tutorId?: string;
  tutorRef?: DocumentReference<DocumentData> | null;
}

export interface IModuleDto {
  id?: string;
  order?: number;
  title?: string;
  description?: string;
  lessons?: ILessonDto[];
  courseRef?: DocumentReference<DocumentData> | null;
}

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

export interface IModule {
  id: string;
  order: number;
  title: string;
  description?: string;
  lessons: ILesson[];
  courseId: string;
  courseRef: DocumentReference<DocumentData> | null;
}

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

export enum COURSE_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  DELETED = "DELETED",
}
