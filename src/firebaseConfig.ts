// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCdUBeFjAPgQLIKwthaESFDQV5HD4hpvFQ",
  authDomain: "e-commerce-app-4ed8e.firebaseapp.com",
  projectId: "e-commerce-app-4ed8e",
  storageBucket: "e-commerce-app-4ed8e.firebasestorage.app",
  messagingSenderId: "33200472185",
  appId: "1:33200472185:web:30527324d11e42ac4b54a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth: Auth = getAuth(app);

export { auth, db };
