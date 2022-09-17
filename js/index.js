import { KEY_LOCAL_STORAGE } from "./shared/constante.js";
import { formRef, notesListRef, archiveListRef } from "./shared/refs.js";

import { addToStorage, getFromStorage } from "./localeStorage.js";
import createNoteData from "./noteDataModel.js";
import { createListMarkup, createNoteMarkup } from "./markup/notesMarkup.js";

function onSubmitCreate(event) {
  event.preventDefault();

  const {
    elements: { title, content, types },
  } = event.currentTarget;

  if (title.value.trim() === "" || content.value.trim() === "") {
    alert("Please fill in all the fields!");
    return;
  }

  const note = createNoteData({
    title: title.value,
    text: content.value,
    type: types.value,
  });
  addToStorage(note);
  addNewNote(note);
  event.currentTarget.reset();
}

function addNewNote(data) {
  let markup;
  if (!Array.isArray(data)) {
    markup = createNoteMarkup(data);
  } else {
    markup = createListMarkup(data);
  }

  addMarkup(markup);
}

function addMarkup(data) {
  notesListRef.insertAdjacentHTML("afterbegin", data);
}

formRef.addEventListener("submit", onSubmitCreate);
