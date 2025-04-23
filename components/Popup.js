export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      //   console.log("this is:", this);
      this.closeModal();
    }
  }

  openModal() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
    // The open() method should be called in the preexisting event handlers in index.js.
  }

  closeModal() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", (evt) =>
      this._handleEscapeClose(evt)
    );
  }

  // that stores the logic for closing the popup by pressing the Escape key.
  // function openModal(modal) {s
  //     modal.classList.remove("modal_closed");
  //     document.addEventListener("keydown", handleEscape);
  //     // console.log(modal.addEventListener("keydown", handleEscape));
  //   }

  //   function closeModal(modal) {
  //     modal.classList.add("modal_closed");
  //     // console.log(modal);
  //     document.removeEventListener("keydown", handleEscape);
  //   }

  //   function handleEscape(evt) {
  //     modals.forEach((modal) => {
  //       if (evt.key === "Escape") {
  //         closeModal(modal);
  //       }
  //     });
  //   }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.closeModal();
    });
    // adds a click event listener to the close icon of the popup.
    // The modal window should also close when users click on the shaded area around the form.
  }
}
// You won’t instantiate your Popup class directly in index.js; instead, you’ll instantiate its child class.
