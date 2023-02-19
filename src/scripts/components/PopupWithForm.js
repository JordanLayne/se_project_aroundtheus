import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, userInfo) {
    super(popupSelector);
    this._userInfo = userInfo;
    this._submitFunction = submitFunction;

    this._form = this._popup.querySelector(".form");

    this._inputList = this._popup.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close = () => {
    this._form.reset();

    super.close();
  };

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitFunction(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }
}
