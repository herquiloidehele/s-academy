import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../config/firebase-service-account.json";
import Firestore = firestore.Firestore;

const LOG_TAG = "FirebaseConfig";

try {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
  Logger.info(LOG_TAG, "Firebase Admin initialized");
} catch (error) {
  Logger.error(LOG_TAG, "Error initializing Firebase Admin", [error]);
}

export const firestoreDB: Firestore = getFirestore();
