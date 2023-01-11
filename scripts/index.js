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

const btnEdit = document.querySelector("#btn-edit");
const profileModal = document.querySelector(".modal");
const profileForm = document.querySelector('.form')
const btnSubmit = document.querySelector("#btn-submit");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const inputName = document.querySelector(".form__input-title");
const inputJob = document.querySelector(".form__input-description");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
function openModal() {
  profileModal.classList.remove("modal_closed");
}
btnEdit.addEventListener("click", openModal);

const profileModalCloseButton = profileModal.querySelector("#btn-close");

function closeModal() {
  profileModal.classList.add("modal_closed");
}
profileModalCloseButton.addEventListener("click", closeModal);

function formSubmit(evt) {
  evt.preventDefault();

 const profileEntry = inputName.value;
  const JobEntry = inputJob.value;
  profileName.textContent = profileEntry;
  profileJob.textContent = JobEntry;

  closeModal()
}

btnSubmit.addEventListener('click', formSubmit)

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardHeading = cardElement.querySelector(".card__heading");
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardHeading.textContent = cardData.name;
  return cardElement;}

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardList.prepend(cardElement);
  });
 