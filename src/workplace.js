import { createWorkplaceUi } from "./workplace-ui";
import {
  removeFromListWorkPlace,
  displayWorkplaceList,
  clearDisplay,
} from "./workplace-ui";
import { getAuth } from "firebase/auth";
import { loadFromDb, writeData } from "./firebaseSave";

let workplaceArray = [];

const auth = getAuth();

function workplaceName(name) {
  //need to see if array already contains an element with this name
  if (name !== "") {
    let arrayForToDos = [];
    //const newWorkPlace = new Workplace(name, arrayForToDos);
    if (workplaceArray.some((element) => element.workplaceName === name))
      return;

    workplaceArray.push({ arrayForToDos, workplaceName: name });

    displayWorkplaceList(name);
    clearDisplay();
    createWorkplaceUi(name);
    saveData();
  }
}

//confirmation logic to delete a workplace
const deleteConfirmation = document.querySelector(".delete-confirmation-div");
const btnDelete = document.querySelector(".btn-confirm-close");
const btnClose = document.querySelector(".btn-cancel-close");
//declare a tmp variable to store the name
let tmpName = "";
btnClose.addEventListener("click", () => {
  closeConfirmation();
});
btnDelete.addEventListener("click", () => {
  removeWorkplaceConfirmed(tmpName);
});

const closeConfirmation = () => {
  deleteConfirmation.style = "transform: translate(-50%, -50%) scale(0)";
};
const openConfirmation = () => {
  deleteConfirmation.style = "transform: translate(-50%, -50%) scale(1)";
};
function removeWorkplace(name) {
  openConfirmation();
  tmpName = name;
}

const removeWorkplaceConfirmed = (name) => {
  const workplaceToRemove = document.querySelector(`[data-id="${name}"]`);
  //need to slice to get only last part of the name
  let workplaceName = name.split("-");
  workplaceName = workplaceName[workplaceName.length - 1];

  const removedArray = workplaceArray.filter(
    (element) => element.workplaceName !== workplaceName
  );
  workplaceArray = removedArray;

  workplaceToRemove.remove();
  removeFromListWorkPlace(workplaceName);
  saveData();
  closeConfirmation();
};

//local storage
function saveData() {
  if (auth.currentUser) writeData(workplaceArray);
  else localStorage.setItem("workplaces", JSON.stringify(workplaceArray));
}

function loadData() {
  if (auth.currentUser) loadFromDb();
  else {
    let workplaceLoaded = JSON.parse(localStorage.getItem("workplaces"));
    if (workplaceLoaded) {
      workplaceLoaded.forEach((element) => {
        workplaceArray.push(element);
        displayWorkplaceList(element.workplaceName);
      });
    } else {
      workplaceArray = [];
    }
  }
}

export { workplaceName, workplaceArray, removeWorkplace, saveData, loadData };
