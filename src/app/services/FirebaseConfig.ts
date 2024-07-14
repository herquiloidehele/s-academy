import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { base64ToObject } from "@/lib/utils";
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
    Logger.debug(this.LOG_TAG, "Initializing Firebase Admin", [process.env.FIREBASE_SERVICE_ACCOUNT_KEY]);

    try {
      if (this.firebaseApp) {
        Logger.info(this.LOG_TAG, "Firebase Admin already initialize", [this.firebaseApp]);
        return;
      }

      const serviceAccountObject = base64ToObject(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

      Logger.debug(this.LOG_TAG, "Service Account Object", [serviceAccountObject]);

      this.firebaseApp = initializeApp({
        credential: cert(serviceAccountObject),
      });

      Logger.debug(this.LOG_TAG, "Firebase Admin initialized");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error initializing Firebase Admin", [error]);
    }
  }
}

export default new FirebaseConfig();
