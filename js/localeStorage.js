import { KEY_LOCAL_STORAGE } from "./shared/constante.js";

export function addToStorage(...args) {
  const storageData = getFromStorage();
  const notesList = [...storageData, ...args];
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(notesList));
}

export function getFromStorage() {
  const strNotes = localStorage.getItem(KEY_LOCAL_STORAGE);
  if (strNotes?.length > 0) {
    return JSON.parse(strNotes);
  }
  return [];
}

export function deleteFromStorage(id) {
  const notes = getFromStorage();

  localStorage.removeItem(KEY_LOCAL_STORAGE);

  const res = notes.filter((item) => item.id !== id);

  if (!res.length) {
    return;
  }

  addToStorage(...res);
}
