import { workplaceArray } from "./workplace";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { loadData } from "./workplace";
import { clearDisplay, clearList, displayWorkplaceList } from "./workplace-ui";

const firebaseConfig = {
  apiKey: "AIzaSyD6Ljq4vYCu-9QsO46rT_rW9tUf5D34VJ8",
  authDomain: "to-do-app-55a96.firebaseapp.com",
  projectId: "to-do-app-55a96",
  storageBucket: "to-do-app-55a96.appspot.com",
  messagingSenderId: "428282657495",
  appId: "1:428282657495:web:35886c23612cd71a734e92",
  measurementId: "G-K10M03DXM0",
};

//need to clear form for login after done / same for sign up

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//authentification
const auth = getAuth();

const formSignUp = document.querySelector(".sign-up-form");
const formLogIn = document.querySelector(".login-form");

const openFormLogin = (form) => {
  form.style.cssText = "transform: translate(-50%, -50%) scale(1)";
};

const closeFormLogin = (form) => {
  form.style.cssText = "transform: translate(-50%, -50%) scale(0)";
};

//sign up
const btnSignUp = document.querySelector(".btn-sign-up");
const btnCloseSignUp = document.querySelector(".btn-close-signup");
const btnSignOut = document.querySelector(".btn-sign-out");
const welcomeUser = document.querySelector(".welcome-user");

btnSignUp.addEventListener("click", () => openFormLogin(formSignUp));
btnCloseSignUp.addEventListener("click", () => closeFormLogin(formSignUp));
btnSignOut.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      onAuthStateChanged(auth);
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});

formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();
  createUser();
});

//login
const btnLogIn = document.querySelector(".btn-login");
const btnCloseLogIn = document.querySelector(".btn-close-login");
btnLogIn.addEventListener("click", () => openFormLogin(formLogIn));
btnCloseLogIn.addEventListener("click", () => closeFormLogin(formLogIn));

formLogIn.addEventListener("submit", (event) => {
  event.preventDefault();
  logIn();
});

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    console.error(error.code, error.message);
  });

const createUser = () => {
  const username = document.querySelector("#username-signup").value;
  const email = document.querySelector("#email-signup").value;
  const password = document.querySelector("#password-signup").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      clearList();
      createUserDB(username);
      closeFormLogin(formSignUp);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

const logIn = () => {
  const email = document.querySelector("#email-login").value;
  const password = document.querySelector("#password-login").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      clearList();
      getUsername();
      welcomeUser.style = "display: inline";
      closeFormLogin(formLogIn);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

const getUsername = async () => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", `${user.uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    welcomeUser.textContent = `Welcome, ${docSnap.data().username}`;
  } else {
    return "Error, user not found";
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    workplaceArray = []; //reset array before loading in case local storage was used before
    getUsername();
    welcomeUser.style = "display: inline";
    btnLogIn.style = "display: none";
    btnSignOut.style = "display: inline";
    btnSignUp.style = "display: none";
  } else {
    btnSignUp.style = "display: inline";
    btnLogIn.style = "display: inline";
    btnSignOut.style = "display: none";
    welcomeUser.style = "display: none";
  }
  clearDisplay();
  clearList();
  loadData();
});

//testing posting

const createUserDB = async (username) => {
  const user = auth.currentUser;
  try {
    await setDoc(doc(db, "users", `${user.uid}`), {
      username: username,
      workplaceArray: [],
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const writeData = async (workplaceArrayTmp) => {
  const user = auth.currentUser;
  try {
    await updateDoc(doc(db, "users", `${user.uid}`), {
      workplaceArray: workplaceArrayTmp,
    });
  } catch (e) {
    console.error(e);
  }
};

const loadFromDb = async () => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", `${user.uid}`);
  const docSnap = await getDoc(docRef);
  let workplaceLoaded;
  if (docSnap.exists()) {
    workplaceLoaded = docSnap.data().workplaceArray;
  } else {
    workplaceLoaded = [];
  }
  if (workplaceLoaded) {
    workplaceLoaded.forEach((element) => {
      workplaceArray.push(element);
      displayWorkplaceList(element.workplaceName);
    });
  } else {
    workplaceArray = [];
  }
};

export { openFormLogin, writeData, loadFromDb };
