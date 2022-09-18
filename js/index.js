//! import { KEY_LOCAL_STORAGE } from "./shared/constante.js";
import {
  formRef,
  notesListRef,
  archiveListRef,
  infoListRef,
} from "./shared/refs.js";

import { addToStorage, getFromStorage } from "./localeStorage.js";
import {
  createNoteData,
  addNewNote,
  deleteNotes,
  addNotesToArchive,
} from "./noteModel.js";
import { showArchivedNotes } from "./modal.js";

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
// listener for crating note
formRef.addEventListener("submit", onSubmitCreate);
// listener for note btn
notesListRef.addEventListener("click", deleteNotes);
notesListRef.addEventListener("click", addNotesToArchive);

//  listener for work with archived data
infoListRef.addEventListener("click", showArchivedNotes);
