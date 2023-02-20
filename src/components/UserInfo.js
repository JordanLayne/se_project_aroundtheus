export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const info = { name: this._nameElement.textContent, job: this._jobElement.textContent };
    return info;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.nameInput;
    this._jobElement.textContent = data.descriptionInput;
  }
}