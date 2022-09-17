import { KEY_LOCAL_STORAGE } from "./shared/constante.js";
import { formRef, notesListRef, archiveListRef } from "./shared/refs.js";

import { addToStorage, getFromStorage } from "./localeStorage.js";
import { createNoteData, addNewNote } from "./noteModel.js";
// import { createListMarkup, createNoteMarkup } from "./markup/notesMarkup.js";

import initialNotes from "../initNotes.js";

function init() {
  const notes = getFromStorage();

  if (notes.length > 0) {
    addNewNote(notes);
    return;
  }
  addToStorage(...initialNotes);
  addNewNote(initialNotes);
}

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

init();

formRef.addEventListener("submit", onSubmitCreate);
