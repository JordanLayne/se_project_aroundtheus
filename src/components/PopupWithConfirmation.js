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
    if (isLoading){this.confirmationBtn.textContent = "Loading...";}
    else{
      this.confirmationBtn.textContent = "Yes"
    }
  }

  setEventListeners() {
    this.confirmationBtn.addEventListener("click", () => {
      this._submitFunction();
    });

    super.setEventListeners();
  }
}
