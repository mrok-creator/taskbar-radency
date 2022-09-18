import {
  createListMarkup,
  createNoteMarkup,
  createEditorMarkup,
} from "./markup/notesMarkup.js";
import {
  deleteFromStorage,
  getFromStorage,
  addToArchiveStorage,
  getFromArchivedStorage,
  addToStorage,
  deleteFromArchiveStorage,
} from "./localeStorage.js";

import { insertActiveNotesCount } from "./counter.js";

import { notesListRef, modalContentRef } from "./shared/refs.js";
import { openNoteEditor, toggleModal } from "./modal.js";

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

function getNodeData(id) {
  const note = getFromStorage().filter((item) => item.id === id)[0];
  return { id, note: { ...note } };
}

function deleteFromList(parent, id) {
  const tr = parent.querySelector(`[data-id='${id}']`);

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

export function editNotes(e) {
  if (e.target.dataset.action !== "edit") {
    return;
  }
  const { note } = getNodeData(e.target.dataset.id);

  const markup = createEditorMarkup(note);
  openNoteEditor(markup);
  createEventListener();
}

function confirmEditions(e) {
  e.preventDefault();

  const {
    elements: { title, content, types },
  } = e.currentTarget;

  const { id, note } = getNodeData(e.target.dataset.id);

  if (
    title.value.trim() === "" &&
    content.value.trim() === "" &&
    note.type == types.value
  ) {
    let sure = confirm(
      "Are you sure you want to leave the note without change?"
    );
    if (sure) {
      // closeNoteEditor();
      toggleModal();
      return;
    } else return;
  }

  // id: Date.now().toString(),
  //   date: date.toDateString(),
  //   title: title.toString(),
  //   text: text.toString(),
  //   type: type.toString(),
  //   dates: "",

  console.log("before=======>", note);
  if (title.value.trim() > 0) {
    note.title = title.value;
  }
  if (content.value.trim() > 0) {
    note.text = content.value;
  }
  if (note.type !== types.value) {
    note.type = types.value;
  }
  const d = new Date(Date.now());
  const newDate = d.toDateString();
  if (newDate != note.date) {
    note.dates = `from:${note.date} to:${newDate}`;
    note.date = newDate;
  }

  console.log("after=======>", note);

  deleteFromStorage(id);
  deleteFromList(notesListRef, id);
  addToStorage(note);
  addNewNote(note);
  insertActiveNotesCount();
  toggleModal();
}

function createEventListener() {
  const editorFormRef = modalContentRef.querySelector("#edit");
  editorFormRef.addEventListener("submit", confirmEditions);
  const closeModalBtn = document.querySelector("[data-modal-close]");
  closeModalBtn.addEventListener("click", toggleModal);
}

export function deleteNotes(e) {
  if (e.target.dataset.action !== "trash") {
    return;
  }
  const noteId = e.target.dataset.id;

  deleteFromList(e.currentTarget, noteId);
  deleteFromStorage(noteId);
  insertActiveNotesCount();
}

// archive notes

export function addNotesToArchive(e) {
  if (e.target.dataset.action !== "zip") {
    return;
  }

  const { id, note } = getNodeData(e.target.dataset.id);

  addToArchiveStorage(note.type, note);

  deleteFromList(e.currentTarget, id);
  deleteFromStorage(id);
  insertActiveNotesCount();
}

export function unzipNote(e) {
  if (e.target.dataset.action !== "unzip") {
    return;
  }

  // get required info
  const { id, type } = e.target.dataset;

  const { note } = getNodeData(id);

  addToStorage(note);
  addNewNote(note);

  deleteFromList(e.currentTarget, id);
  deleteFromArchiveStorage(type, id);
  insertActiveNotesCount();
}
