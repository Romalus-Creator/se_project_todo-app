import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import ToDo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function countCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function totalChecks(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function totalTodos(total) {
  todoCounter.updateTotal(total);
}

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

const generateTodo = (data) => {
  const todo = new ToDo(
    data,
    "#todo-template",
    countCheck,
    totalChecks,
    totalTodos
  );
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

const newPopupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateValue = inputValues.date;

    const date = new Date(dateValue);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();

    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    popup.closeModal();
    formValidator.resetValidation();
  },
  totalTodos,
});

newPopupWithForm.setEventListeners();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
