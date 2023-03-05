import Card from "../components/Card.js";
import "./index.css";
import {
  profileForm,
  profileJob,
  profileName,
  cardsModal,
  pfpModal,
  placesList,
  editProfilePopup,
  profileModal,
  inputName,
  inputJob,
  cardList,
  cardsForm,
  cardTemplate,
  cardsSubmit,
  pfpButton,
  confirmationModal,
  cardAddButton,
  editPfpButton,
  imageModal,
  cardPreviewImage,
  modalCardDescription,
  config,
  cards,
  selectors,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const editFormValidator = new FormValidator(
  config,
  profileModal.querySelector(".form")
);
const cardFormValidator = new FormValidator(
  config,
  cardsModal.querySelector(".form")
);
const pfpFormValidator = new FormValidator(
  config,
  pfpModal.querySelector(".form")
);
const cardPreview = new PopupWithImage(selectors.imageModal);

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "6b5f9b21-423f-4b74-93a5-6054c4d2009d",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatar: ".profile__image",
});
api.getData().then(([userData, cardsData]) => {
  userInfo.setUserInfo(userData);
  const userId = userData._id;
  const initialCards = cardsData;

  const cardSection = new Section(
    {
      initialCards,
      renderer: (data) => {
        const card = new Card(
          {
            data,
            handleImageClick: (imageData) => {
              cardPreview.open(imageData);
            },
            confirmationFunction: (cardId) => {
              confirmModal.open();
              confirmModal.setSubmitAction(() => {
                confirmModal.isLoading();
                api
                  .deleteCard(cardId)
                  .then(() => {
                    card.removeCard();
                    confirmModal.close();
                  })
                  .finally(() => {
                    confirmModal.finishLoading();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
            },
            handleLikeFunction: (card) => {
              if (card.checkIfLiked()) {
                api
                  .removeLike(card.getId())
                  .then((data) => {
                    card.removeLike();
                    card.setLikeNumber(data.likes.length);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                api
                  .addLike(card.getId())
                  .then((data) => {
                    card.addLike();
                    card.setLikeNumber(data.likes.length);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            },
            onLoadLikeCheck: (data) => {
              data.forEach((obj) => {
                if (obj._id === userId) {
                  card.addLike();
                }
              });
            },
          },
          selectors.cardSelector
        );
        const cardElement = card.generateCard(userId);
        return cardElement;
      },
    },
    cards
  );

  cardSection.renderItems(initialCards);

const confirmModal = new PopupWithConfirmation(selectors.confirmationModal);
confirmModal.setEventListeners();

const editPopupForm = new PopupWithForm(
  selectors.profileModal,

  (inputValues) => {
    editPopupForm.isLoading();

    api

      .setUserInfo(inputValues)

      .then((data) => {
        userInfo.setUserInfo(data);

        editPopupForm.close();
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        editPopupForm.finishLoading();
      });
  }
);

editPopupForm.setEventListeners();

editProfilePopup.addEventListener("click", () => {
  editPopupForm.open();

  const info = userInfo.getUserInfo();

  inputName.value = info.name;

  inputJob.value = info.job;

  editFormValidator.toggleButtonState();
});
const addPopupForm = new PopupWithForm(selectors.cardsModal, (inputValues) => {
  addPopupForm.isLoading();
  api
    .addNewCard(inputValues)
    .then((data) => {
      cardSection.addItem(data);
      addPopupForm.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addPopupForm.finishLoading();
    });
});
addPopupForm.setEventListeners();

cardAddButton.addEventListener("click", () => {
  addPopupForm.open();
  cardFormValidator.toggleButtonState();
});

const userPfpForm = new PopupWithForm(
  selectors.profilePicture,
  (inputValues) => {
    userPfpForm.isLoading();
    api
      .updatePfp(inputValues.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        userPfpForm.close();
      })
      .finally(() => {
        userPfpForm.finishLoading();
      });
  }
);

userPfpForm.setEventListeners();

editPfpButton.addEventListener("click", () => {
  userPfpForm.open();
  pfpFormValidator.toggleButtonState();
});
editPfpButton.addEventListener("mouseover", () => {
  pfpButton.classList.add("profile__picture_active");
});

editPfpButton.addEventListener("mouseout", () => {
  pfpButton.classList.remove("profile__picture_active");
});
});

cardPreview.setEventListeners();
pfpFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
