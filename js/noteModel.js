import { createListMarkup, createNoteMarkup } from "./markup/notesMarkup.js";
import {
  deleteFromStorage,
  getFromStorage,
  addToArchiveStorage,
  getFromArchivedStorage,
  addToStorage,
  deleteFromArchiveStorage,
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

export function deleteFromList(element) {
  const td = element.parentNode;
  const tr = td.parentNode;
  tr.remove();
}

// active notes

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
  const noteId = e.target.dataset.id;

  deleteFromList(e.target);
  deleteFromStorage(noteId);
}

// archive notes

export function addNotesToArchive(e) {
  if (e.target.dataset.action !== "zip") {
    return;
  }

  // get current note
  const noteId = e.target.dataset.id;
  const noteData = getFromStorage().filter((item) => item.id === noteId)[0];

  addToArchiveStorage(noteData.type, noteData);

  deleteFromList(e.target);
  deleteFromStorage(noteId);
}

export function unzipNote(e) {
  if (e.target.dataset.action !== "unzip") {
    return;
  }

  // get required info
  const { id, type } = e.target.dataset;

  const noteData = getFromArchivedStorage(type).filter(
    (item) => item.id === id
  );

  addToStorage(...noteData);

  deleteFromList(e.target);
  deleteFromArchiveStorage(type, id);
  window.location.reload();
}
