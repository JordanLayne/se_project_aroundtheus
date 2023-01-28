function showInputError(
  formElement,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    "#" + inputElements.id + "-error"
  );
  inputElements.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElements.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    "#" + inputElements.id + "-error"
  );
  inputElements.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}
function hasInvalidInput(inputList) {
return !inputList.every((inputElement) => inputElement.validity.valid)
}
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }){
 if (hasInvalidInput(inputElements)) {
  submitButton.classList.add(inactiveButtonClass)
  submitButton.disabled = true
}else
  {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}
  }
function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputElements, submitButton, options);
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputElements, submitButton, options);
    }, 0);
  });
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}
function enableValidation(options) {
  const formElement = [...document.querySelectorAll(options.formSelector)];
  formElement.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}
const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(config);
