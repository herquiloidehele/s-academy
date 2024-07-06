import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Firestore = firestore.Firestore;

class FirebaseConfig {
  private firebaseApp: ReturnType<typeof initializeApp> | null = null;
  private readonly LOG_TAG = "FirebaseConfig";

  public constructor() {
    this.initialize();
  }

  public get firestoreDB(): Firestore {
    return getFirestore();
  }

  public initialize(): void {
    Logger.debug(this.LOG_TAG, "Initializing Firebase Admin");

    try {
      if (this.firebaseApp) {
        Logger.info(this.LOG_TAG, "Firebase Admin already initialize", [this.firebaseApp]);
        return;
      }

      this.firebaseApp = initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as any)),
      });

      Logger.debug(this.LOG_TAG, "Firebase Admin initialized");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error initializing Firebase Admin", [error]);
    }
  }
}

export default new FirebaseConfig();
