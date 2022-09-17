export function createListMarkup(data) {
  const listMarkup = data.map((item) => createNoteMarkup(item));
  return listMarkup.join();
}
export function createNoteMarkup({ id, date, title, text, type, dates }) {
  return `<tr data-id="${id}">
          <td>
           <svg
              class="icon"
              width="30"
              height="30"
              aria-label="Notes control button"
            >
              <use class="" href="./images/svg/sprite.svg#${returnLogo(
                type
              )}"></use>
            </svg>
          ${title}</td>
          <td>${date}</td>
          <td>${type}</td>
          <td>${text}</td>
          <td>${dates}</td>
           <td class="btnThumb">
            <button class="btn" type="button" data-id="${id}" data-action="edit">
              <svg
                class="icon"
                width="30"
                height="30"
                aria-label="Notes control button"
              >
                <use class="" href="./images/svg/sprite.svg#edit"></use>
              </svg>
            </button>

            <button class="btn" type="button" data-id="${id}" data-action="zip">
              <svg
                class="icon"
                width="30"
                height="30"
                aria-label="Notes control button"
              >
                <use class="" href="./images/svg/sprite.svg#archive-add"></use>
              </svg>
            </button>

            <button class="btn" type="button" data-id="${id}"  data-action="trash">
              <svg
                class="icon"
                width="30"
                height="30"
                aria-label="Notes control button"
                data-action="trash"
                data-id="${id}" 
              >
                <use class="" href="./images/svg/sprite.svg#trash"></use>
              </svg>
            </button>
          </td>
        </tr>`;
}

function returnLogo(type) {
  if (type === "idea") {
    return "idea";
  }
  if (type === "task") {
    return "task";
  }
  if (type === "quote") {
    return "quote";
  }
  if (type === "random-thought") {
    return "random-thought";
  }
  return;
}
