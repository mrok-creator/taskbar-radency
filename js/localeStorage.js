import { KEY_LOCAL_STORAGE, KEY_LOCAL_ARCHIVE } from "./shared/constant.js";

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

// archived notes

export function addToArchiveStorage(type, ...args) {
  const archivedData = getFromArchivedStorage(type);
  const notesList = [...archivedData, ...args];
  localStorage.setItem(
    `${KEY_LOCAL_ARCHIVE}-${type}`,
    JSON.stringify(notesList)
  );
}

export function getFromArchivedStorage(type) {
  const strNotes = localStorage.getItem(`${KEY_LOCAL_ARCHIVE}-${type}`);
  if (strNotes?.length > 0) {
    return JSON.parse(strNotes);
  }
  return [];
}

export function deleteFromArchiveStorage(type, id) {
  const notes = getFromArchivedStorage(type);

  localStorage.removeItem(`${KEY_LOCAL_ARCHIVE}-${type}`);

  const res = notes.filter((item) => item.id !== id);

  if (!res.length) {
    return;
  }

  addToArchiveStorage(type, ...res);
}
