class Card {
  constructor({
    data,
    handleImageClick,
    handleDeleteConfirmation,
    confirmationFunction,
    handleLikeFunction,
    onLoadLikeCheck,
  }, templateSelector) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleImageClick = handleImageClick;
    this.handleDeleteConfirmation = handleDeleteConfirmation;
    this.confirmationFunction = confirmationFunction;
    this.handleLikeFunction = handleLikeFunction;
    this.onLoadLikeCheck = onLoadLikeCheck;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  removeCard() {
    this.element.remove();
  }

  setLikeNumber(likeAmount) {
    this.likeNumber.textContent = likeAmount;
  }

  checkIfLiked() {
    return this.likeButton.classList.contains("card__like-button_is-active");
  }

  addLike() {
    this.likeButton.classList.add("card__like-button_is-active");
  }

  removeLike() {
    this.likeButton.classList.remove("card__like-button_is-active");
  }

  getId() {
    return this.data._id;
  }

  generateCard(userId) {
    this.element = this._getTemplate();
    this._setEventHandlers();

    this.cardImage = this.element.querySelector(".card__image");
    this.cardTitle = this.element.querySelector(".card__description");
    this.likeNumber = this.element.querySelector(".card__like-number");
    this.trash = this.element.querySelector(".card__remove");
    this.likeButton = this.element.querySelector(".card__like-button");

    this.onLoadLikeCheck(this.data.likes, this.likeButton);

    this.likeNumber.textContent = this.data.likes.length;

    if (this.data.owner._id === userId) {
      this.trash.classList.add("card__trash_opened");
    }

    this.cardImage.src = this.data.link;
    this.cardImage.alt = `Photo of ${this.data.name}`;
    this.cardTitle.textContent = this.data.name;

    return this.element;
  }

  _setEventHandlers() {
    this.element.querySelector(".card__image").addEventListener("click", () => {
      this.handleImageClick({ title: this.data.name, image: this.data.link });
    });

    this.element.querySelector(".card__like-button").addEventListener("click", () => {
      this.handleLikeFunction(this);
    });

    this.element.querySelector(".card__remove").addEventListener("click", () => {
      this.confirmationFunction(this.data._id);
    });
  }
}

export default Card;