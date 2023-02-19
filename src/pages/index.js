import Card from "../scripts/components/Card.js";
import "./index.css";
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
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
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
  editPopupForm.open();
  const info = user.getUserInfo();
  inputName.value = info.name;
  inputJob.value = info.job;
  editFormValidator.toggleButtonState();
});

cardAddButton.addEventListener("click", () => {
  addPopupForm.open();
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

      return cardElement;
    },
  },
  cards
);

cardSection.renderItems(initialCards);
cardPreview.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
