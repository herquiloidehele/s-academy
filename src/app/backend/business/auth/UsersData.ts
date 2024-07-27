import { DocumentData } from "@firebase/firestore";
import { firestore } from "firebase-admin";
import { USER_ROLES } from "@/utils/Constants";
import DocumentReference = firestore.DocumentReference;

export interface IUser {
  id: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
}

export interface ITutor {
  id?: string;
  name: string;
  userRef: DocumentReference<DocumentData, DocumentData> | null;
  description: string;
  phone: string;
  mpesaPhone?: string;
  isRegistrationComplete: boolean;
}
