import { archivedMarkup } from "./markup/archiveNoteMarkup.js";

function openModal(data) {
  const instance = basicLightbox.create(data);

  instance.show();

  if (instance.visible()) {
    document.addEventListener("keydown", (event) => {
      if (event.code !== "Escape") return;
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
