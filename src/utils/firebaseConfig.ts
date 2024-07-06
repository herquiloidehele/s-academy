import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../config/firebase-service-account.json";
import Firestore = firestore.Firestore;

try {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
} catch (error) {
  Logger.error("FirebaseConfig", "Error initializing Firebase Admin", [error]);
}

export const firestoreDB: Firestore = getFirestore();
