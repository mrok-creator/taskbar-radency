import { createListMarkup, createNoteMarkup } from "./markup/notesMarkup.js";
import {
  deleteFromStorage,
  getFromStorage,
  addToArchiveStorage,
} from "./localeStorage.js";

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

export function addMarkup(data) {
  notesListRef.insertAdjacentHTML("beforeend", data);
}

export function deleteFromList(id, element) {
  const td = element.parentNode;
  const tr = td.parentNode;

  deleteFromStorage(id);
  tr.remove();
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

export function deleteNotes(e) {
  if (e.target.dataset.action !== "trash") {
    return;
  }
  const taskId = e.target.dataset.id;

  deleteFromList(taskId, e.target);
}

export function addNotesToArchive(e) {
  if (e.target.dataset.action !== "zip") {
    return;
  }

  // get current note
  const taskId = e.target.dataset.id;
  const noteData = getFromStorage().filter((item) => item.id === taskId)[0];

  addToArchiveStorage(noteData.type, noteData);

  deleteFromList(taskId, e.target);
}
