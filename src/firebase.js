import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// NOTE:Declan this API key is not a key that we need to hide from users and in fact has to be provided in the bundled code.
// NOTE:Declan If this was server side, we would want to store this in an environment variable to prevent exposing it in the codebase.
const firebaseConfig = {
  apiKey: "AIzaSyCPykv6DZ19DLHs7QBA-ujijROiv-bk4Q8",
  authDomain: "finni-a4d71.firebaseapp.com",
  projectId: "finni-a4d71",
  storageBucket: "finni-a4d71.appspot.com",
  messagingSenderId: "901520991249",
  appId: "1:901520991249:web:d8093cd3f2dcc4f0e9bdb0",
  measurementId: "G-TDQ98FEJ6V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);