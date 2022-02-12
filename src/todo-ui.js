import { createTodo, removeTodo, modifyToDo } from "./todo";
import { createWorkplaceUi, tmpBtnName } from "./workplace-ui";
import pen from "../src/icons/pen.svg";
import trash from "../src/icons/trash.svg";

//update name for submit form -> independant form that needs to know the name of the to do
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", () => {
  createToDoUI(tmpBtnName, Math.floor(Math.random() * 1000000));
});

//create the to do display
const createToDoUI = (name, rdn) => {
  //getting the last part of the name (actual name without workplace)
  let nameForArray = name.split("-");
  nameForArray = nameForArray[nameForArray.length - 1];

  //getting values
  const title = document.querySelector(".text-title").value;
  const description = document.querySelector(".text-description").value;
  const priority = document.querySelector(".text-priority").value;

  //creating the content of the to dos
  createTodo(title, description, priority, nameForArray, rdn);
  toDoUI(title, description, priority, nameForArray, rdn);

  //reset values on the to do form for next one
  document.querySelector(".text-title").value = "";
  document.querySelector(".text-description").value = "";
  document.querySelector(".text-priority").value = "";
};

const toDoUI = (titleTodo, descriptionTodo, priorityTodo, name, rdn) => {
  let currentToDo = document.querySelector(
    `[data-id="workplace-display-${name}"]`
  );
  const toDo = document.createElement("div");
  toDo.classList = "todo-display";
  toDo.setAttribute("data-id", `todo-item-${rdn}`);

  //creating the content of the to dos
  const title = titleTodo;
  const description = descriptionTodo;
  const priority = priorityTodo;

  //creating and appending all the elements of a to do
  const titleText = document.createElement("h3");
  titleText.classList = "todo-title";
  titleText.textContent = title;
  const descriptionText = document.createElement("p");
  descriptionText.textContent = description;
  const priorityText = document.createElement("p");
  priorityText.textContent = "Priority: " + priority;

  toDo.append(titleText);
  toDo.append(descriptionText);
  toDo.append(priorityText);

  //creating modify to-do button
  const wrapperBtns = document.createElement("span");
  wrapperBtns.classList = "wrapper-btns-todos";
  const btnModify = document.createElement("img");
  btnModify.src = pen;
  btnModify.classList = "btn-modify";
  btnModify.addEventListener("click", () =>
    modifyToDo(btnModify.parentElement.parentElement.getAttribute("data-id"))
  );
  wrapperBtns.append(btnModify);

  //create the remove button inside the todos
  const btnRemove = document.createElement("img");
  btnRemove.src = trash;
  btnRemove.classList = "btn-remove";
  btnRemove.addEventListener("click", () =>
    removeTodo(btnRemove.parentElement.parentElement.getAttribute("data-id"))
  );
  wrapperBtns.append(btnRemove);
  toDo.append(wrapperBtns);
  currentToDo.append(toDo);
};

export { createWorkplaceUi, createToDoUI, toDoUI };
