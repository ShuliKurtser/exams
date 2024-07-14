
import  {initializeApp} from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCYoLYuqzczo5cQty4TepHaZd3vkG0GZEw",
    authDomain: "exams-m.firebaseapp.com",
    projectId: "exams-m",
    storageBucket: "exams-m.appspot.com",
    messagingSenderId: "208220576074",
    appId: "1:208220576074:web:d13bd5efcaba6cd52489b3"
  };

  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)

  

 
  
  

  