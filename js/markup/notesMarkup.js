export function createListMarkup(data) {
  const listMarkup = data.map((item) => createNoteItem(item));
  return listMarkup.join();
}
export function createNoteMarkup({ id, date, title, text, type, dates }) {
  return `<tr data-id="${id}">
          <td>${title}</td>
          <td>${date}</td>
          <td>${type}</td>
          <td>${text}</td>
          <td>${dates}</td>
          <td>???????</td>
        </tr>`;
}
