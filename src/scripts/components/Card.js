class Card {
  constructor({ data, handleImageClick }, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__description"); 

    this._cardImage.src = this._image;
    this._cardImage.alt = `Photo of ${this._link}`;
    this._cardTitle.textContent = this._title;
    this._setEventHandlers();
    return this._element;
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButton(evt) {
    this._element.remove();
    this._element = null;
  }

  _setEventHandlers() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ title: this._title, image: this._image });
    });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });

    this._element
      .querySelector(".card__remove")
      .addEventListener("click", (evt) => {
        this._handleDeleteButton(evt);
      });
  }
}

export default Card;
