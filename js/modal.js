import { modal, modalContentRef } from "./shared/refs.js";

import { archivedMarkup } from "./markup/archiveNoteMarkup.js";

import { unzipNote } from "./noteModel.js";

function openModal(data) {
  const instance = basicLightbox.create(data);

  instance.show();
  if (instance.visible()) {
    document.addEventListener("click", unzipNote);
  }
  if (instance.visible()) {
    document.addEventListener("keydown", (event) => {
      if (event.code !== "Escape") return;
      document.removeEventListener("click", unzipNote);
      instance.close();
    });
  }
}

export function showArchivedNotes(e) {
  if (e.target.dataset.action !== "showList") {
    return;
  }
  const type = e.target.dataset.type;

  const markup = archivedMarkup(type);
  openModal(markup);
}

export function toggleModal() {
  modal.classList.toggle("is-hidden");
  document.body.classList.toggle("modal-open");
}

export function openNoteEditor(data) {
  modalContentRef.innerHTML = data;
  toggleModal();
}
