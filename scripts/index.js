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
const btnEdit = document.querySelector("#btn-edit");
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
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.addEventListener("mousedown", closeModalOnRemoteClick);

  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal_opened")
  ) {
    closeModal(evt.target);
  }
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");

    closeModal(openedModal);
  }
}
function fillProfileForm() {
  inputName.value = profileName.textContent;

  inputJob.value = profileJob.textContent;
}
btnEdit.addEventListener("click", openEditProfileModal);

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileModal);
}

const closeButtons = document.querySelectorAll(".modal-btn-close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardAddButton.addEventListener("click", () => {
  openModal(cardsModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileEntry = inputName.value;
  const jobEntry = inputJob.value;
  profileName.textContent = profileEntry;
  profileJob.textContent = jobEntry;
  closeModal(profileModal);
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardHeading = cardElement.querySelector(".card__heading");
  const removeButton = cardElement.querySelector(".card__remove");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardHeading.textContent = cardData.name;
  cardImage.addEventListener("click", () => {
    modalCardDescription.textContent = cardData.name;
    cardPreviewImage.src = cardData.link;
    cardPreviewImage.alt = cardData.name;
    openModal(imageModal);
  });

  likeButton.addEventListener("click", handleLikeButton);
  removeButton.addEventListener("click", handleDeleteCard);
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.prepend(cardElement);
}

cardsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const link = e.target.link.value;
  const newCard = renderCard({ name: name, link: link });
  closeModal(cardsModal);
  e.target.reset();
});

initialCards.forEach(renderCard);
