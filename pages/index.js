import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import ToDo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

//This should be replaced with Section class and loose coupling, right??
const generateTodo = (data) => {
  const todo = new ToDo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

//This should be replaced with Section class and loose coupling, right??
//Perhaps the renderItems func in the Section class?
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems(initialTodos);
// const renderTodo = (item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// };

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();

  //This should be replaced with Section class and loose coupling, right??
  //Not sure how this will fit into the Section class/loose coupling refactoring yet.
  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  //TASK - I AM TOTALLY NOT UNDERSTANDING HOW TO GET THIS VALUES OBJECT ADDED ONTO THE DOM or either into the initialToDos obj array.
  //Perhaps I need to rework my renderItems and addItem functions to where addItems is the final function that ends up being called on index.js?
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

// initialTodos.forEach((item) => {
//   renderTodo(item);
// });

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
