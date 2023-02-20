import Card from "../components/Card.js";
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
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const editFormElement = profileModal.querySelector(".form");
const cardFormElement = cardsModal.querySelector(".form");
const editFormValidator = new FormValidator(config, editFormElement);
const cardFormValidator = new FormValidator(config, cardFormElement);
const cardPreview = new PopupWithImage(selectors.imageModal);
const user = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

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
