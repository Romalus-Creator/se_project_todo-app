export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._clickOutsideClose = this._clickOutsideClose.bind(this);
  }

  _clickOutsideClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.closeModal();
    }
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  openModal() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("click", this._clickOutsideClose);
    document.addEventListener("keydown", this._handleEscapeClose);
    // The open() method should be called in the preexisting event handlers in index.js.
  }

  closeModal() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("click", this._clickOutsideClose);
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.closeModal();
    });
  }
}
// You won’t instantiate your Popup class directly in index.js; instead, you’ll instantiate its child class.
