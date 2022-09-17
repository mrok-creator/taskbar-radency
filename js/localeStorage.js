import { KEY_LOCAL_STORAGE } from "./shared/constante.js";

export function addToStorage(data) {
  const storageData = getFromStorage();
  const notesList = [...storageData, data];
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(notesList));
}

export function getFromStorage() {
  const strNotes = localStorage.getItem(KEY_LOCAL_STORAGE);
  if (strNotes?.length > 0) {
    return JSON.parse(strNotes);
  }
  return [];
}
