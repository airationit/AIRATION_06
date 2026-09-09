import { initializeApp, getApps, getApp } from "firebase/app";
import { getRemoteConfig, isSupported, RemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton Firebase App instance
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Safe browser-only Remote Config getter with environment support verification
export const getFirebaseRemoteConfig = async (): Promise<RemoteConfig | null> => {
  if (typeof window !== "undefined") {
    try {
      const supported = await isSupported();
      if (supported) {
        return getRemoteConfig(app);
      }
    } catch {
      return null;
    }
  }
  return null;
};
