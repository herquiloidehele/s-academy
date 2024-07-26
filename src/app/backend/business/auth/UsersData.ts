import { DocumentData } from "@firebase/firestore";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TUTOR = "tutor",
}
export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ITutor {
  id: string;
  userRef: DocumentReference<DocumentData, DocumentData> | null;
  description: string;
  phone: string;
  mpesaPhone: string;
  isRegistrationComplete: boolean;
}
