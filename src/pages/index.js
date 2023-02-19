import Card from "../scripts/Card.js";
import {
  profileForm,
  profileJob,
  profileName,
  cardsModal,
  placesList,
  editProfilePopup,
  profileModal,
  inputName,
  inputJob,
  cardList,
  cardsForm,
  cardTemplate,
  cardsSubmit,
  cardAddButton,
  imageModal,
  cardPreviewImage,
  modalCardDescription,
  config,
  cards,
  initialCards,
  selectors,
  submitButton,
} from "../scripts/constants.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import { closeModal, closeByEscape, openModal } from "../scripts/Utils.js";
import FormValidator from "../scripts/FormValidator.js";
const editFormElement = profileModal.querySelector(".form");
const cardFormElement = cardsModal.querySelector(".form");
const editFormValidator = new FormValidator(config, editFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);
const cardPreview = new PopupWithImage(selectors.imageModal);
const user = new UserInfo({ name: profileName, job: profileJob });

const editPopupForm = new PopupWithForm(
  selectors.profileModal,
  (inputValues) => {
    user.setUserInfo(inputValues);
  }
);
editPopupForm.setEventListeners();

const addPopupForm = new PopupWithForm(selectors.cardsModal, (inputValues) => {
  const data = { name: inputValues.title, link: inputValues.imageLink };

  cardSection.addItem(data);
});

addPopupForm.setEventListeners();

editProfilePopup.addEventListener("click", () => {
  openModal(profileModal);
  const info = user.getUserInfo();
  inputName.value = info.name;
  inputJob.value = info.job;
  editFormValidator.toggleButtonState();
});

cardAddButton.addEventListener("click", () => {
  openModal(cardsModal);
  cardFormValidator.toggleButtonState();
});

const cardSection = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleImageClick: (imageData) => {
            cardPreview.open(imageData);
          },
        },
        selectors.cardSelector
      );
      const cardElement = card.generateCard();

      console.log(cardElement);
      return cardElement;
    },
  },
  cards
);

cardSection.renderItems(initialCards);
cardPreview.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
