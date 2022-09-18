import { infoListRef } from "./shared/refs.js";

import { getFromArchivedStorage, getFromStorage } from "./localeStorage.js";

// active notes

function countActiveNotes() {
  const counter = {
    idea: 0,
    task: 0,
    quote: 0,
    thought: 0,
  };
  const notes = getFromStorage();

  notes.forEach(({ type }) => {
    counter[type] += 1;
  });

  return counter;
}

// archived notes

function countArchivedNotes() {
  const counter = {
    idea: 0,
    task: 0,
    quote: 0,
    thought: 0,
  };

  const types = Object.keys(counter);

  types.forEach((type) => {
    counter[type] = getFromArchivedStorage(type).length;
  });

  return { archive: counter, types };
}

export function insertActiveNotesCount() {
  const active = countActiveNotes();
  const { archive, types } = countArchivedNotes();

  types.forEach((type) => {
    const ref = infoListRef.querySelector(`#${type}`);
    const refArchived = infoListRef.querySelector(`#${type}Archived`);

    ref.innerHTML = active[type];
    refArchived.innerHTML = archive[type];
  });
}
