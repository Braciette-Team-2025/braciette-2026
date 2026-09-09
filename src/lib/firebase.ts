import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export function getFirebaseAuth() {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be used in the browser");
  }

  return getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();
