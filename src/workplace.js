import { addFunctionsToButtons } from "./index";
import { createWorkplaceUi, toDoUI } from "./todo-ui";
import { removeFromListWorkPlace } from "./workplace-ui";

let workplaceArray = [];

function workplace(workplaceName, arrayForToDos) {
  this.workplaceName = workplaceName;
  this.arrayForToDos = arrayForToDos;
}

function workplaceName(name) {
  //need to see if array already contains an element with this name
  if (name != "") {
    let arrayForToDos = [];
    const newWorkPlace = new workplace(name, arrayForToDos);
    if (workplaceArray.some((element) => element.workplaceName === name))
      return;

    workplaceArray.push(newWorkPlace);
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
      createWorkplaceUi(element.workplaceName);
      element.arrayForToDos.forEach((x) => {
        toDoUI(x.title, x.description, x.priority, element.workplaceName, x.id);
      });
    });
    addFunctionsToButtons();
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
