import { initializeApp } from "firebase/app";
import {
  //GoogleAuthProvider,
  getAuth,
  //signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  //sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  // getDocs,
  // onSnapshot,
  // query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBomVYN9jTinQ_SGSpIMTFrafO-P3k5foQ",
  authDomain: "react-school-projects.firebaseapp.com",
  projectId: "react-school-projects",
  storageBucket: "react-school-projects.appspot.com",
  messagingSenderId: "545846768787",
  appId: "1:545846768787:web:e78826778665e021564966",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};

// tutorial from https://blog.logrocket.com/user-authentication-firebase-react-apps/
// REMEMBER useNavigate instead of useHistory and navigate instead of history.push or history.replace
// with navigate = useNavigate instead of history = useHistory
