// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Constants } from "@/utils/Constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.EXTERNAL_CONFIGS.FIREBASE_API_KEY,
  authDomain: Constants.EXTERNAL_CONFIGS.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.EXTERNAL_CONFIGS.FIREBASE_PROJECT_ID,
  storageBucket: Constants.EXTERNAL_CONFIGS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.EXTERNAL_CONFIGS.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.EXTERNAL_CONFIGS.FIREBASE_APP_ID,
  measurementId: Constants.EXTERNAL_CONFIGS.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseClientApp = initializeApp(firebaseConfig);
