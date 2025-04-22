import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import ToDo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

const generateTodo = (data) => {
  const todo = new ToDo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const popup = new Popup("#add-todo-popup");
popup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popup.openModal();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   popup.closeModal();
// });

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems(initialTodos);

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();

  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  popup.closeModal();
  formValidator.resetValidation();
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
