import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCWlG6HipYnL1o6HquhJcXvpf5zZhHVPaA",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "mainpage-3b1c9.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mainpage-3b1c9",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "mainpage-3b1c9.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1021424722784",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:1021424722784:web:5c49fa7d0d9ec026397405",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1F4RSHWEX5",
};

// Initialize Firebase (Singleton pattern to prevent re-initialization during SSR / Fast Refresh)
export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics conditionally (Client-side only)
let analyticsInstance: Analytics | null = null;

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== "undefined") {
    try {
      const supported = await isSupported();
      if (supported && !analyticsInstance) {
        analyticsInstance = getAnalytics(app);
      }
      return analyticsInstance;
    } catch (error) {
      console.warn("Firebase Analytics could not be initialized:", error);
      return null;
    }
  }
  return null;
};

export default app;
