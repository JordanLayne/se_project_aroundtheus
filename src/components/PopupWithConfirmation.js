import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.confirmationBtn = this._popup.querySelector("#certaintyConfirm");
  }

  setSubmitAction(action) {
    this._submitFunction = action;
  }
  renderLoading(isLoading) {
    this.confirmationBtn.textContent = "Loading...";
  }

  setEventListeners() {
    this.confirmationBtn.addEventListener("click", () => {
      this._submitFunction();
    });

    super.setEventListeners();
  }
}
