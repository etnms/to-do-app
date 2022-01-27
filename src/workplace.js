import { createWorkplaceUi } from "./todo-ui";
import { removeFromListWorkPlace, displayWorkplaceList, clearDisplay } from "./workplace-ui";

let workplaceArray = [];

//constructor for workplaces
function workplace(workplaceName, arrayForToDos) {
  this.workplaceName = workplaceName;
  this.arrayForToDos = arrayForToDos;
}

function workplaceName(name) {
  //need to see if array already contains an element with this name
  if (name !== "") {
    let arrayForToDos = [];
    const newWorkPlace = new workplace(name, arrayForToDos);
    if (workplaceArray.some((element) => element.workplaceName === name))
      return;

    workplaceArray.push(newWorkPlace);

    displayWorkplaceList(name);
    clearDisplay();
    createWorkplaceUi(name);
    saveLocalStorage();
  }
}

function removeWorkplace(name) {
  const workplaceToRemove = document.querySelector(`#${name}`)
  //need to slice to get only last part of the name
  let workplaceName = name.split("-");
  workplaceName = workplaceName[workplaceName.length - 1]; 

  const removedArray = workplaceArray.filter(element => element.workplaceName !== workplaceName);
  workplaceArray = removedArray;
  
  workplaceToRemove.remove();
  removeFromListWorkPlace(workplaceName);

  saveLocalStorage();
}

//local storage
function saveLocalStorage() {
  localStorage.setItem("workplaces", JSON.stringify(workplaceArray));
}

function loadLocalStorage() {
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

//reset the list for debugging purposes
function reset() {
  workplaceArray = [];
  saveLocalStorage();
}
//reset();

export {
  workplaceName,
  workplaceArray,
  removeWorkplace,
  saveLocalStorage,
  loadLocalStorage,
};
