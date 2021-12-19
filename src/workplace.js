import { addFunctionsToButtons } from "./index.js";
import { createWorkplaceUi } from "./todo-ui.js";

let workplaceArray = [];

function workplace(workplaceName, arrayForToDos) {
  this.workplaceName = workplaceName;
  this.arrayForToDos = arrayForToDos;
}

function workplaceName(name) {
  //need to see how can check  is array already contains an element with this name
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

//local storage
//saving
function saveLocalStorage() {
  localStorage.setItem("workplaces", JSON.stringify(workplaceArray));
}
//retrieving
function loadLocalStorage() {
  let workplaceLoaded = JSON.parse(localStorage.getItem("workplaces"));
  if (workplaceLoaded) {
    workplaceLoaded.forEach((element) => {
      workplaceArray.push(element);
      createWorkplaceUi(element.workplaceName);
      addFunctionsToButtons();
    });
  } else {
    workplaceArray = [];
  }
}
//reset the list for debugging purposes
function reset(){
  workplaceArray = [];
  saveLocalStorage();
}
//reset();

export { workplaceName, workplaceArray, saveLocalStorage, loadLocalStorage };
