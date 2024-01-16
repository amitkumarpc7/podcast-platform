// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// For DataBase
import { getFirestore} from "firebase/firestore";
// for Storage
import { getStorage } from "firebase/storage";
// for Authorization
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyAGV8wVrIM-aS3msStf0Qr4HQYvMJCyTek",
  authDomain: "podcast-react-app-692f0.firebaseapp.com",
  projectId: "podcast-react-app-692f0",
  storageBucket: "podcast-react-app-692f0.appspot.com",
  messagingSenderId: "553230278237",
  appId: "1:553230278237:web:5db9237396bdd42e6937b4",
  measurementId: "G-CYL56PTYYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);
const auth= getAuth(app);

export {db,storage,auth};
