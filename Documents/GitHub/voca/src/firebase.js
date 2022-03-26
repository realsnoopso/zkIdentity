import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYxYpJiqgJyN3oy6hWC4l3fuq3prdG9ps",
    authDomain: "voca-3d2b0.firebaseapp.com",
    projectId: "voca-3d2b0",
    storageBucket: "voca-3d2b0.appspot.com",
    messagingSenderId: "478233250942",
    appId: "1:478233250942:web:b9dcae2d33c6cb313d9c2f",
    measurementId: "G-FSTKRP20EH"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };