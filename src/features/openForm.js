export const openForm = (placeholder, add, cancel) => {
  return inputForm = `
    <div class='add-new-column'>
    <input class='add-column-input' placeholder=${placeholder}>
    <div class='select-block'>
      <button class='create create-card save-title save-edit-card'>${add}</button>
      <button class='cancel cancel-card cancel-title cancel-edit-card'>${cancel}</button>
    </div>
  </div>`
}