// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCrliCc_VJ4T9xx_TwKy0O_9VpOkltVNdc",

  authDomain: "art-portfolio-gray-59acb.firebaseapp.com",

  projectId: "art-portfolio-gray-59acb",

  storageBucket: "art-portfolio-gray-59acb.firebasestorage.app",

  messagingSenderId: "914360083247",

  appId: "1:914360083247:web:928283048f31ce01e537da",

  databaseURL: "https://art-portfolio-gray-59acb-default-rtdb.firebaseio.com/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const storage = getStorage(app);
export const db = getDatabase(app);
export default app;
