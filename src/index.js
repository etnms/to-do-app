import "./style.css";
import { loadData } from "./workplace";
import * as firebase from "./firebaseSave";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Every functions can be found in other files,
// index is used to tie them together
