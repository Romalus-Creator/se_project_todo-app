class ToDo {
  constructor(data, selector, countCheck, incrementChecks, incrementTodos) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._countCheck = countCheck;
    this._completed = data.completed;
    this._incrementChecks = incrementChecks;
    this._incrementTodos = incrementTodos;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this.toggleCompletion();
      this._countCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._incrementChecks(this._completed);
      this._incrementTodos(false);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  toggleCompletion() {
    this._completed = !this._completed;
  }

  _getDueDate() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._getDueDate();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default ToDo;
