import "./style.css";
import { openForm } from "./todo.js";
import { workplaceName, loadLocalStorage } from "./workplace.js";
import { createToDoUI } from "./todo-ui.js";

//button to create a workplace
const btnAddWorkplace = document.querySelector(".btn-add-workplace");
btnAddWorkplace.addEventListener("click", () => {
  let name = document.querySelector("#workplace-form-title").value;
  workplaceName(name);
  addFunctionsToButtons();
});

//add functions to the to do button
const addFunctionsToButtons = () => {
  let allToDoButtonWorkplace = document.querySelectorAll(".btn-add-todo");
  allToDoButtonWorkplace.forEach((button) => {
    button.addEventListener("click", () => {
      openForm();
      getNameOfBtn(button.parentElement.id);
    });
  });
};

const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", () => createToDoUI(btnName, Math.floor(Math.random() * 100000)));

let btnName;
function getNameOfBtn(name) {
  btnName = name;
}

loadLocalStorage();

export {addFunctionsToButtons};