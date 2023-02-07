import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import { closeModal, closeByEscape, openModal } from "../scripts/utils.js";
const initialCards = [
  {
    name: "Yosemite Valley",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",

    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const placesList = document.querySelector("#card-list");
const editProfilePopup = document.querySelector("#btn-edit");
const profileModal = document.querySelector("#edit-modal");
const profileForm = document.querySelector("#form-profile");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const inputName = document.querySelector(".form__input-title");
const inputJob = document.querySelector(".form__input-description");
const cardList = document.querySelector(".cards__list");
const cardsForm = document.querySelector("#cards-form");
const cardsModal = document.querySelector("#cards-modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsSubmit = document.querySelector("#cards-submit");
const cardAddButton = document.querySelector("#add-button");
const imageModal = document.querySelector("#image-modal");
const cardPreviewImage = document.querySelector(".modal__preview-image");
const modalCardDescription = document.querySelector(
  ".modal__image-description"
);
const cardSelector = "#card-template";
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
editProfilePopup.addEventListener("click", (evt) => {
  fillProfileForm()
  openModal(profileModal);
});
cardAddButton.addEventListener("click", () => {
  openModal(cardsModal);
});
profileForm.addEventListener("submit", handleProfileFormSubmit);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileEntry = inputName.value;
  const jobEntry = inputJob.value;
  profileName.textContent = profileEntry;
  profileJob.textContent = jobEntry;
  closeModal(profileModal);
}
cardsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const link = e.target.link.value;
  const newCard = renderCard({ name: name, link: link });
  closeModal(cardsModal);

  e.target.reset();
});
const closeButtons = document.querySelectorAll(".modal-btn-close");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
initialCards.forEach(renderCard);
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  document.querySelector(".cards__list").prepend(card.getCardView());
}
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormElement = profileModal.querySelector(".form");
const cardFormElement = cardsModal.querySelector(".form");
const editFormValidator = new FormValidator(config, editFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
