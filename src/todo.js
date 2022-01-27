import { workplaceArray, saveLocalStorage } from "./workplace";

//constructor for the to dos
function ToDoItem(title, description, priority, id) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.id = id;
}

//declare variables to use in different files
let idToDo;
let toDoToModify;
const formModify = document.querySelector(".modify-form");

const createTodo = (title, description, priority, name, id) => {
  const newToDoFile = new ToDoItem(title, description, priority, id);
  workplaceArray.forEach((element) => {
    if (element.workplaceName === name)
      workplaceArray[workplaceArray.indexOf(element)].arrayForToDos.push(
        newToDoFile
      );
  });
  closeForm();
  saveLocalStorage();
};

const removeTodo = (name) => {
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
        for (let i = 0; i < workplaceArray.length; i++) {
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
};

const closeModifyForm = () => {
  formModify.style.cssText = "transform: translate(-50%, -50%) scale(0)";
};
//modify to do
const modifyToDo = (name) => {
  formModify.style.cssText = "transform: translate(-50%, -50%) scale(1)";
  const btnCloseForm = document.querySelector(".modify-close-form");
  btnCloseForm.addEventListener("click", () => closeModifyForm());

  const modifiedTitle = document.querySelector(".modify-text-title");
  const modifiedDescription = document.querySelector(
    ".modify-text-description"
  );
  const modifiedPriority = document.querySelector(".modify-text-priority");
  //declare todo names
  idToDo = name.split("-");
  idToDo = idToDo[idToDo.length - 1];
  //get workplacename
  toDoToModify = document.querySelector(`#${name}`);
  let tempWorkplaceName = toDoToModify.parentElement.id.split("-"); //need to slice to get only last part of the name
  tempWorkplaceName = tempWorkplaceName[tempWorkplaceName.length - 1];

  workplaceArray.forEach((element) => {
    element.arrayForToDos.forEach((x) => {
      //multiple foreach to get into the 2 different arrays
      if (x.id.toString() === idToDo) {
        //for loop in order to get the name of workplacearray, necessary to delete inside correct array
        modifiedTitle.value = x.title;
        modifiedDescription.value = x.description;
        modifiedPriority.value = x.priority;
      }
    });
  });
};

const modifySubmitBtn = document.querySelector(".modify-submit-btn");
modifySubmitBtn.addEventListener("click", () => {
  modifyInArray(idToDo, toDoToModify), closeModifyForm(), console.log("ble");
});

const modifyInArray = (idToDo, toDoToModify) => {
  workplaceArray.forEach((element) => {
    console.log(element);
    element.arrayForToDos.forEach((x) => {
      //multiple foreach to get into the 2 different arrays
      if (x.id.toString() === idToDo) {
        console.log(workplaceArray);
        //for loop in order to get the name of workplacearray, necessary to delete inside correct array
        x.title = document.querySelector(".modify-text-title").value;
        x.description = document.querySelector(
          ".modify-text-description"
        ).value;
        x.priority = document.querySelector(".modify-text-priority").value;
        toDoToModify.childNodes[0].textContent =
          document.querySelector(".modify-text-title").value;
        toDoToModify.childNodes[1].textContent = document.querySelector(
          ".modify-text-description"
        ).value;
        toDoToModify.childNodes[2].textContent = document.querySelector(
          ".modify-text-priority"
        ).value;
        saveLocalStorage();
        return;
      }
    });
  });
};

//opening and closing the form to put to-do info
const form = document.querySelector(".form-div");
const btnCloseForm = document.querySelector(".close-form");
btnCloseForm.addEventListener("click", () => closeForm());

const openForm = () => {
  form.style.cssText = "transform: translate(-50%, -50%) scale(1)";
};

const closeForm = () => {
  form.style.cssText = "transform: translate(-50%, -50%) scale(0)";
};

export { createTodo, removeTodo, openForm, closeForm, modifyToDo };
