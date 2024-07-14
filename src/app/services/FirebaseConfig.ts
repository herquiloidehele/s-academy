import { firestore } from "firebase-admin";
import Logger from "@/utils/Logger";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import Firestore = firestore.Firestore;

class FirebaseConfig {
  private firebaseApp: ReturnType<typeof initializeApp> | null = null;
  private readonly LOG_TAG = "FirebaseConfig";

  private firebaseConfig: any = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: String(process.env.FIREBASE_PRIVATE_KEY).replaceAll(/\\n/gm, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: "googleapis.com",
  };

  public constructor() {
    this.initialize();
  }

  public get firestoreDB(): Firestore {
    return getFirestore();
  }

  public initialize(): void {
    Logger.debug(this.LOG_TAG, "Initializing Firebase Admin", [this.firebaseConfig]);

    try {
      if (this.firebaseApp) {
        Logger.info(this.LOG_TAG, "Firebase Admin already initialize", [this.firebaseApp]);
        return;
      }

      this.firebaseApp = initializeApp({
        credential: cert(this.firebaseConfig),
      });

      Logger.debug(this.LOG_TAG, "Firebase Admin initialized");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error initializing Firebase Admin", [error]);
    }
  }
}

export default new FirebaseConfig();
