import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Firestore = firestore.Firestore;

const LOG_TAG = "FirebaseConfig";

try {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as any)),
  });
  Logger.info(LOG_TAG, "Firebase Admin initialized");
} catch (error) {
  Logger.error(LOG_TAG, "Error initializing Firebase Admin", [error]);
}

export const firestoreDB: Firestore = getFirestore();
