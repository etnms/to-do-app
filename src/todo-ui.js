import { createTodo, removeTodo, modifyToDo } from "./todo";
import { createWorkplaceUi, tmpBtnName } from "./workplace-ui";

//update name for submit form -> independant form that needs to know the name of the to do
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", () =>
  createToDoUI(tmpBtnName, Math.floor(Math.random() * 1000000))
);

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
};

const toDoUI = (titleTodo, descriptionTodo, priorityTodo, name, rdn) => {
  let currentToDo = document.querySelector(`#workplace-display-${name}`);
  const toDo = document.createElement("div");
  toDo.classList = "todo-display";
  toDo.setAttribute("id", `todo-item-${rdn}`);
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
  priorityText.textContent = priority;
  toDo.append(titleText);
  toDo.append(descriptionText);
  toDo.append(priorityText);

  //creating modify to-do button
  const btnModify = document.createElement("img");
  btnModify.src = "../src/icons/pen.svg";
  btnModify.classList = "btn-modify";
  btnModify.addEventListener("click", () =>
    modifyToDo(btnModify.parentElement.id)
  );
  toDo.append(btnModify);

  //create the remove button inside the todos
  const btnRemove = document.createElement("img");
  btnRemove.src = "../src/icons/trash.svg";
  btnRemove.classList = "btn-remove";
  btnRemove.addEventListener("click", () =>
    removeTodo(btnRemove.parentElement.id)
  );
  toDo.append(btnRemove);
  currentToDo.append(toDo);
};

export { createWorkplaceUi, createToDoUI, toDoUI };
