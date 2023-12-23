import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFcHC3afXEqL0MrK92DkH24Ksse9myYeE",
  authDomain: "netflix-clone-c22fa.firebaseapp.com",
  projectId: "netflix-clone-c22fa",
  storageBucket: "netflix-clone-c22fa.appspot.com",
  messagingSenderId: "1036533886091",
  appId: "1:1036533886091:web:f9d071b9f8323efc37f88e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
