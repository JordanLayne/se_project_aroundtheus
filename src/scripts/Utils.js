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
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");

    closeModal(openedModal);
  }
}

export { closeModal, closeByEscape, openModal };
