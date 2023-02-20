import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, userInfo) {
    super(popupSelector);
    this._userInfo = userInfo;
    this._submitFunction = submitFunction;

    this._form = this._popup.querySelector(".form");


  }

  _getInputValues() {
    const formValues = {}; 
    const inputList = this._popup.querySelectorAll(".form__input");
     inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
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
