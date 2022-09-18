//! import { KEY_LOCAL_STORAGE } from "./shared/constante.js";
import { formRef, notesListRef, infoListRef } from "./shared/refs.js";

import { addToStorage, getFromStorage } from "./localeStorage.js";
import {
  createNoteData,
  addNewNote,
  deleteNotes,
  addNotesToArchive,
  editNotes,
} from "./noteModel.js";
import { showArchivedNotes } from "./modal.js";
import { insertActiveNotesCount } from "./counter.js";

import initialNotes from "../initNotes.js";

function init() {
  const notes = getFromStorage();
  insertActiveNotesCount();

  if (notes.length > 0) {
    addNewNote(notes);
    return;
  }
  addToStorage(...initialNotes);
  addNewNote(initialNotes);
  insertActiveNotesCount();
}

function onSubmitCreate(e) {
  e.preventDefault();

  const {
    elements: { title, content, types },
  } = e.currentTarget;

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
  insertActiveNotesCount();
  e.currentTarget.reset();
}

init();

// listener for crating note
formRef.addEventListener("submit", onSubmitCreate);

// listener for note btn
notesListRef.addEventListener("click", deleteNotes);
notesListRef.addEventListener("click", addNotesToArchive);

// editor listener
notesListRef.addEventListener("click", editNotes);

// const editorFormRef = modalContentRef.querySelector("#edit");
// editorFormRef.addEventListener("submit", confirmEditions);

//  listener for work with archived data
infoListRef.addEventListener("click", showArchivedNotes);
