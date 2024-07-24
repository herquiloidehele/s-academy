import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";
import { get } from "@vercel/edge-config";
import { v4 as uuidV4 } from "uuid";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Firestore = firestore.Firestore;

class FirebaseConfig {
  private firebaseApp: ReturnType<typeof initializeApp> | null = null;
  private readonly LOG_TAG = "FirebaseConfig";

  private _firestoreDB: Firestore | null = null;

  public get firestoreDB(): Firestore {
    if (!this._firestoreDB) {
      throw new Error("Firestore DB not initialized");
    }

    return this._firestoreDB;
  }

  public checkFirestoreDB(): boolean {
    return !!this._firestoreDB;
  }

  public async initialize() {
    Logger.debug(this.LOG_TAG, "Initializing Firebase Admin");

    try {
      const firebaseConfig = await get("firebaseConfig");

      Logger.debug(this.LOG_TAG, "Firebase Config");

      if (this.firebaseApp) {
        Logger.info(this.LOG_TAG, "Firebase Admin already initialize", [this.firebaseApp]);
        return;
      }

      this.firebaseApp = initializeApp(
        {
          credential: cert(firebaseConfig as any),
        },
        uuidV4(),
      );

      this._firestoreDB = getFirestore(this.firebaseApp);

      Logger.debug(this.LOG_TAG, "Firebase Admin initialized successfully", [this.firebaseApp, this._firestoreDB]);
    } catch (error: any) {
      Logger.warn(this.LOG_TAG, "Error initializing Firebase Admin", [error?.message]);
    }
  }
}

export default new FirebaseConfig();
