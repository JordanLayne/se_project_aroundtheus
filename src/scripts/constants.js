
  export const placesList = document.querySelector("#card-list");
  export const editProfilePopup = document.querySelector("#btn-edit");
  export const profileModal = document.querySelector("#edit-modal");
  export const profileForm = document.querySelector("#form-profile");
  export const profileName = document.querySelector(".profile__title");
  export const profileJob = document.querySelector(".profile__description");
  export const inputName = document.querySelector(".form__input-title");
  export  const inputJob = document.querySelector(".form__input-description");
  export const submitButton = document.querySelector('.form__save-button')
  export const cardList = document.querySelector(".cards__list");
  export const cardsForm = document.querySelector("#cards-form");
  export const cardsModal = document.querySelector("#cards-modal");
  export  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
    export const cardsSubmit = document.querySelector("#cards-submit");
    export const cardAddButton = document.querySelector("#add-button");
    export const imageModal = document.querySelector("#image-modal");
    export const cardPreviewImage = document.querySelector(".modal__preview-image");
    export const modalCardDescription = document.querySelector(
    ".modal__image-description"
  );
  export const cards = document.querySelector('.cards')
  export const selectors = {
    cardSection: '#card-list',
    cardSelector: "#card-template",
    cardsForm: "#cards-form",
    profileForm:'#form-profile',
    imageModal: '#image-modal',
    profileModal: '#edit-modal',
    cardsModal: '#cards-modal'
  }
  export const  initialCards = [
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
  export const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
