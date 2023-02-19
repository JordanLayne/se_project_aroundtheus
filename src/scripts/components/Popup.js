export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const popupClose = this._popup.querySelector(`#${this._popup.id}-close`);

    popupClose.addEventListener("click", this.close.bind(this));

    this._popup.addEventListener(
      "mousedown",

      this._handleClickClose.bind(this)
    );
  }
}
