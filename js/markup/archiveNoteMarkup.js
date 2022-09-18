import { getFromArchivedStorage } from "../localeStorage.js";

export function archivedMarkup(type) {
  const notes = getFromArchivedStorage(type);

  if (!notes.length) {
    return `<div class='modal'> 
        <h2>Your archive is still empty</h2>
        </div>`;
  }

  const elementList = notes
    .map(
      ({ title, text, id, type }) => `
        <tr data-id='${id}'>
          <td>${title}</td>
          <td>${text}</td>

          <td class="btnThumb">
            <button class="btn unzip" type="button" data-action="unzip" data-id='${id}' data-type='${type}' ></button>
          </td>
        </tr>
      
    `
    )
    .join("");

  return `
  <div class='modal'>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th></th>
        </tr>
      </thead>

      <tbody id="archiveList">
      ${elementList}
</tbody>
    </table>
    </div>
    `;
}
