import { createListMarkup, createNoteMarkup } from "./markup/notesMarkup.js";
import { deleteFromStorage } from "./localeStorage.js";

import { notesListRef } from "./shared/refs.js";

export function createNoteData(data) {
  const { title, text, type } = data;
  const date = new Date(Date.now());

  return {
    id: Date.now().toString(),
    date: date.toDateString(),
    title: title.toString(),
    text: text.toString(),
    type: type.toString(),
    dates: "",
  };
}

export function addNewNote(data) {
  let markup;
  if (!Array.isArray(data)) {
    markup = createNoteMarkup(data);
  } else {
    markup = createListMarkup(data);
  }

  addMarkup(markup);
}

export function addMarkup(data) {
  notesListRef.insertAdjacentHTML("beforeend", data);
}

deleteNotes;

function deleteNotes(e) {
  if (e.target.dataset.action !== "trash") {
    return;
  }
  const doneTaskId = e.target.dataset.id;
  console.log(doneTaskId);

  deleteFromStorage(doneTaskId);
  e.target.parentNode.remove();
}

notesListRef.addEventListener("click", deleteNotes);
