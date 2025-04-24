import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, totalTodos }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._totalTodos = totalTodos;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this._totalTodos(true);
    });
  }

  // addTodoForm.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  //   const name = evt.target.name.value;
  //   const dateInput = evt.target.date.value;

  //   // Create a date object and adjust for timezone
  //   const date = new Date(dateInput);
  //   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  //   const id = uuidv4();

  //   const values = { name, date, id };
  //   const todo = generateTodo(values);
  //   section.addItem(todo);
  //   popup.closeModal();
  //   formValidator.resetValidation();
  // });
}
