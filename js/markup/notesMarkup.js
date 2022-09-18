export function createListMarkup(data) {
  const listMarkup = data.map((item) => createNoteMarkup(item));

  return listMarkup.join("");
}
export function createNoteMarkup({ id, date, title, text, type, dates }) {
  return `<tr data-id="${id}">
          <td>
           <svg
              class="icon"
              width="30"
              height="30"
              aria-label="Notes type icon"
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
            <button class="btn edit" type="button" data-id="${id}" data-action="edit" data-modal-open>
              
            </button>

            <button class="btn zip" type="button" data-id="${id}" data-action="zip">
             
            </button>

            <button class="btn trash" type="button" data-id="${id}"  data-action="trash">
              
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
  if (type === "thought") {
    return "thought";
  }
  return;
}

export function createEditorMarkup({ id, title, text }) {
  return `
  <button type="button" class="modalBtn" data-modal-close>x</button>  
  <form id="edit" class="form" data-id='${id}'>
      <label for="title" class="input-title"> Change your note: </label>

      <label for="content" class="input-title">
        Change content of your note:
      </label>

      <label for="types" class="input-title"> Choose a type: </label>

      <input
        type="text"
        placeholder="${title}"
        name="title"
        class="input"
      />
      <input type="text" placeholder="${text}" name="content" class="input" />

      <select id="type" name="types" size="1" class="input">
        <option value="idea">Idea</option>
        <option value="task">Task</option>
        <option value="quote">Quote</option>
        <option value="thought">Random Thought</option>
      </select>

      <button type="submit" class="addBtn" data-action='edit' >Edit</button>
      
    </form>

  `;
}
