import { createTodo, removeTodo } from "./todo";

const classDisplay = document.querySelector(".class-display");

//const btnAdd = document.querySelector(".button-add-todo");
function createWorkplaceUi(name) {
  //create the workplace
  const workplaceDisplay = document.createElement("div");
  workplaceDisplay.classList = "workplace-display";
  workplaceDisplay.setAttribute("id", `workplace-display-${name}`);
  //button to add to dos inside workplace
  const btnAddToDoWorkplace = document.createElement("button");
  btnAddToDoWorkplace.classList = "btn-add-todo";
  btnAddToDoWorkplace.textContent = "Add to do";
  workplaceDisplay.append(btnAddToDoWorkplace);
  classDisplay.append(workplaceDisplay);
}

//create the to do display
function createToDoUI(name) {
  let currentToDo = document.querySelector(`#${name}`); 
  let nameForArray = name.split("-");
  let rdn = Math.floor(Math.random() * 100000);
  const toDo = document.createElement("div");
  toDo.classList = "todo-display";
  toDo.setAttribute("id", `todo-item-${rdn}`);
  //creating the content of the to dos
  const title = document.querySelector("#text-title").value;
  const description = document.querySelector("#text-description").value;
  const priority = document.querySelector("#text-priority").value;
  createTodo(title,description, priority,nameForArray[nameForArray.length - 1], rdn);
  
  //creating and appending all the elements of a to do
  let titleText = document.createElement("p");
  titleText.textContent = title;
  let descriptionText = document.createElement("p");
  descriptionText.textContent = description;
  let priorityText = document.createElement("p");
  priorityText.textContent = priority;
  toDo.append(titleText);
  toDo.append(descriptionText);
  toDo.append(priorityText);

  //create the remove button inside the todos
  let btnRemove = document.createElement("button");
  btnRemove.classList = "btn-remove";
  btnRemove.textContent = "Remove";
  toDo.append(btnRemove);
  btnRemove.addEventListener("click", () => removeTodo(btnRemove.parentElement.id));
  console.log(btnRemove.parentElement);
  
  currentToDo.append(toDo);
}


export { createWorkplaceUi, createToDoUI };
