import { workplaceArray, saveLocalStorage } from "./workplace";

function ToDoItem(title, description, priority, id) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.id = id;
}

function createTodo(title, description, priority, name, id) {
  const newToDoFile = new ToDoItem(title, description, priority, id);
  workplaceArray.forEach((element) => {
    
    if (element.workplaceName === name)
      workplaceArray[workplaceArray.indexOf(element)].arrayForToDos.push(
        newToDoFile
      );
  });
  closeForm();
  saveLocalStorage();
}

function removeTodo(name) {
  //declare todo names
  let idToDo = name.split("-");
  idToDo = idToDo[idToDo.length - 1];

  //get workplacename
  let toDoToRemove = document.querySelector(`#${name}`);
  let tempWorkplaceName = toDoToRemove.parentElement.id.split("-"); //need to slice to get only last part of the name
  tempWorkplaceName = tempWorkplaceName[tempWorkplaceName.length - 1];
  //removing from divs
  toDoToRemove.remove();
  //removing from array by looping through each to get the position and then removing it
  workplaceArray.forEach((element) => {
    element.arrayForToDos.forEach((x) => {
      //multiple foreach to get into the 2 different arrays
      if (x.id.toString() === idToDo) {
        //for loop in order to get the name of workplacearray, necessary to delete inside correct array
        for (let i = 0; i < workplaceArray.length; i++){
          if (workplaceArray[i].workplaceName === tempWorkplaceName) {
            workplaceArray[i].arrayForToDos.splice(
              element.arrayForToDos.indexOf(x),
              1
            );
            saveLocalStorage();
            return;
          }
      }
    }
    });
  });

}

//modify to do
function modifyToDo() {}

//opening and closing the form to put to-do info
const form = document.querySelector(".form-div");
const btnCloseForm = document.querySelector("#close-form");
btnCloseForm.addEventListener("click", closeForm);

function openForm() {
  form.style.cssText = "transform: translate(-50%, -50%) scale(1)";
}

function closeForm() {
  form.style.cssText = "transform: translate(-50%, -50%) scale(0)";
}

export { createTodo, removeTodo, openForm };
