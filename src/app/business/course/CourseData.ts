import { DocumentData } from "@firebase/firestore";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

export interface ICourse {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration: string;
  discount: number;
}

export interface ILesson {
  id: string;
  order: number;
  videoRef: string;
  title: string;
  duration: string;
  description?: string;
  thumbnailUrl: string;
  courseId: DocumentReference<DocumentData, DocumentData> | null;
  section: {
    id: number;
    title: string;
  };
}

export interface ICourseSection {
  title: string;
  lessons: ILesson[];
}
