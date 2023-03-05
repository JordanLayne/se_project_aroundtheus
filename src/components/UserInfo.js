export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatar }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return{
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar,
    };
    
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
