import { openModal } from "./Utils.js";
class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  getCardView() {
    this._element = this._getTemplate();
    this._setEventListenersCard();
    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = `Photo of ${this._name}`;
    this._element.querySelector(".card__heading").textContent = this._name;

    return this._element;
  }

  _setEventListenersCard() {
    this._element
      .querySelector(".card__remove-button")
      .addEventListener("click", () => this._handleDeleteBtn(this));
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleHeartBtn(this));
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImagePreview(this));
  }
  _handleDeleteBtn() {
    this._element.closest(".card").remove();
  }
  _handleHeartBtn() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }
  _handleImagePreview() {
    const modalPreview = document.querySelector("#image-modal")
    const modalImage = document.querySelector(".modal__preview-image");
    const imageTitle = document.querySelector(".modal__image-description");
    modalImage.src = this._link;
    modalImage.alt = "Image of " + this._name;
    imageTitle.textContent = this._name;
    openModal(modalPreview);
  }
}

export default Card;