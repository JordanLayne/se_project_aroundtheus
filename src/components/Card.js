class Card {
  constructor({ data, handleImageClick }, templateSelector) {
    const { name, link } = data;
    this._title = name;
    this._image = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    const element = this._getTemplate();
    const cardImage = element.querySelector(".card__image");
    const cardTitle = element.querySelector(".card__description");
    const cardLikeButton = element.querySelector(".card__like-button");
    const cardRemoveButton = element.querySelector(".card__remove");

    cardImage.src = this._image;
    cardImage.alt = `Photo of ${this._image}`;
    cardTitle.textContent = this._title;
    this._setEventHandlers(cardImage, cardLikeButton, cardRemoveButton);

    return element;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButton(evt) {
    const card = evt.target.closest(".card");
    card.remove();
  }

  _setEventHandlers(cardImage, cardLikeButton, cardRemoveButton) {
    cardImage.addEventListener("click", () => {
      this._handleImageClick({ title: this._title, image: this._image });
    });

    cardLikeButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

    cardRemoveButton.addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });
  }
}

export default Card;
