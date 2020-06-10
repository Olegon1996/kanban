import {getUserData} from '../services/api'
import {move} from './moveCard'
import {Element} from './Element'

export const renderCol = async () => {
  const element = new Element()
  const data = await getUserData()
  if (data && data.columns) {
    const columnsArr = Object.values(data.columns)
    element.column.innerHTML = ''
    columnsArr.forEach(c => {
      const newDiv = Element.createChildNode({name: 'div', columnId: c.columnId})

      const titleDiv = Element.createChildNode({
        name: 'div',
        className: ['card-title'],
      })
      titleDiv.appendChild(Element.createChildNode({
        name: 'span',
        className: ['card-title-span'],
        text: c.columnName,
      }))
      titleDiv.appendChild(Element.createChildNode({
        name: 'span',
        className: ['column-title-edit'],
      }))
      titleDiv.appendChild(Element.createChildNode({
        name: 'span',
        className: ['column-title-delete'],
      }))
      newDiv.appendChild(titleDiv)
      element.renderCard(c, newDiv)
      newDiv.appendChild(Element.createChildNode({
        name: 'div',
        className: ['add-card', 'before-class'],
        text: 'Додати карточку'
      }))
      element.column.appendChild(newDiv)
    })
    element.addCard()
    element.editCard()
    element.deleteCard()
    element.editTitle()
    element.deleteColumn()
    move(document.querySelectorAll('.cards-container'))
    const loader = document.querySelector('.loader-container')
    loader.style.display = 'none'
  } else {
    element.column.innerHTML = ''
  }
}