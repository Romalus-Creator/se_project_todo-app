import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import ToDo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

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

function incrementChecks(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function incrementTodos(total) {
  todoCounter.updateTotal(total);
}

const generateTodo = (data) => {
  const todo = new ToDo(
    data,
    "#todo-template",
    countCheck,
    incrementChecks,
    incrementTodos
  );
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  newPopupWithForm.openModal();
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

const newPopupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateValue = inputValues.date;

    const date = new Date(dateValue);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();

    const values = { name, date, id };
    renderTodo(values);
    // const todo = generateTodo(values);
    // section.addItem(todo);
    newPopupWithForm.closeModal();
    formValidator.resetValidation();
    incrementTodos(true);
  },
  // incrementTodos,
});

newPopupWithForm.setEventListeners();

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
