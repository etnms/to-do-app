import { openForm, closeForm } from "./todo";
import { toDoUI } from "./todo-ui";
import { workplaceArray, removeWorkplace, workplaceName } from "./workplace";

//declaring variables
const classDisplay = document.querySelector(".class-display");
const workplaceList = document.querySelector(".list-workplaces");
let tmpBtnName;

const displayWorkplaceList = (name) => {
  const workplaceEl = document.createElement("button");
  workplaceEl.classList = "btn-list-workplaces";
  workplaceEl.id = `workplace-list-btn-${name}`;
  workplaceEl.textContent = name;
  workplaceList.append(workplaceEl);

  workplaceEl.addEventListener("click", (event) => {
    createWorkplaceUi(name);
    displayToDos(name);
    removeColorBtns();
    event.target.classList.toggle("active");
  });
};

const displayToDos = (name) => {
  workplaceArray.forEach((element) => {
    if (element.workplaceName === name) {
      element.arrayForToDos.forEach((x) => {
        toDoUI(x.title, x.description, x.priority, element.workplaceName, x.id);
      });
    }
  });
};

const removeColorBtns = () => {
  const btnList = document.querySelectorAll(".btn-list-workplaces.active");
  btnList.forEach((button) => button.classList.toggle("active"));
};

const removeFromListWorkPlace = (name) => {
  const btnToRemove = document.querySelector(`#workplace-list-btn-${name}`);
  btnToRemove.remove();
};

const clearDisplay = () => {
  closeForm();
  const display = document.querySelector(".class-display");
  while (display.firstChild) display.removeChild(display.firstChild);
};

const createWorkplaceUi = (name) => {
  clearDisplay();
  //create the workplace
  const workplaceDisplay = document.createElement("div");
  workplaceDisplay.classList = "workplace-display";
  workplaceDisplay.setAttribute("id", `workplace-display-${name}`);

  //button to add to dos inside workplace
  const btnAddToDoWorkplace = document.createElement("button");
  btnAddToDoWorkplace.classList = "btn-add-todo";
  btnAddToDoWorkplace.textContent = "+";
  btnAddToDoWorkplace.addEventListener("click", () => {
    addFunctionsToButtons(event);
  });

  const addFunctionsToButtons = (event) => {
    openForm();
    tmpBtnName = event.target.parentElement.id;
  };

  workplaceDisplay.append(btnAddToDoWorkplace);

  //buttons to remove workplace
  const btnRemoveWorkplace = document.createElement("button");
  btnRemoveWorkplace.classList = "btn-remove-workplace";
  btnRemoveWorkplace.textContent = "Delete workplace";
  workplaceDisplay.append(btnRemoveWorkplace);
  btnRemoveWorkplace.addEventListener("click", () => {
    removeWorkplace(btnRemoveWorkplace.parentElement.id);
  });

  const btnCloseWorkplace = document.createElement("button");
  btnCloseWorkplace.classList = "btn-close-workplace";
  btnCloseWorkplace.textContent = "X";
  workplaceDisplay.append(btnCloseWorkplace);
  btnCloseWorkplace.addEventListener("click", () => {
    clearDisplay();
    removeColorBtns();
  });
  //append workplace
  classDisplay.append(workplaceDisplay);
};

//button to create a workplace
const btnAddWorkplace = document.querySelector(".btn-add-workplace");
btnAddWorkplace.addEventListener("click", () => {
  let name = document.querySelector(".workplace-form-title").value;
  const test = document.querySelector(".workplace-form-title");
  if (name ==="") {
    test.setCustomValidity("You need to type a name!");
    test.reportValidity();
  } else {
    test.setCustomValidity("");
  }
  //if input already exist opens the corresponding workplace
  workplaceArray.some((element) => {
    if (element.workplaceName === name) {createWorkplaceUi(name), displayToDos(name);};
  });
  // otherwise create a new workplace
  workplaceName(name);
  removeColorBtns();
  const newBtn = document.querySelector(`#workplace-list-btn-${name}`);
  if (name !== "") newBtn.classList.toggle("active");
  
  //reset input to empty value
  document.querySelector(".workplace-form-title").value = "";
});

export {
  displayWorkplaceList,
  removeFromListWorkPlace,
  clearDisplay,
  createWorkplaceUi,
  tmpBtnName,
};
