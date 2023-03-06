import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, userInfo) {
    super(popupSelector);
    this._userInfo = userInfo;
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".form");
    this._saveButton = this._popup.querySelector(".form__save-button");
  }

  _getInputValues() {
    const formValues = {};
    const inputList = this._popup.querySelectorAll(".form__input");
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setSubmitAction(action) {
    this._submitFunction = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }
  close = () => {
    this._form.reset();

    super.close();
  };

  open = (prefilled) => {
    if (prefilled) {
      this._inputList.forEach((input) => {
        input.value = "Loading...";
      });
    }
    super.open();
  };

  close(resetForm = true) {
    super.close();
    if (resetForm) {
      setTimeout(() => {
        this._form.reset();
      }, 500);
    }
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitFunction(this._getInputValues());
    });

    super.setEventListeners();
  }
}
