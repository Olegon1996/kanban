import {Element} from "./Element"

export const carRender = (c, newDiv) => {
  const cardsDiv = Element.createChildNode({name: 'div', columnId: c.columnId, className: ['cards-container']})
  if (c.tasks && c.tasks) {
    const filteredTasks = Object.values(c.tasks).sort((a, b) =>a.positionNumber -  b.positionNumber)
    filteredTasks.forEach(t => {
      if (t && t.cardId) {
        const p = Element.createChildNode({
          name: 'p',
          className: ['card-item'],
          columnId: t.cardId,
        })

        p.appendChild(Element.createChildNode({
          name: 'span',
          className: ['card-text'],
          text: t.value,
        }))

        p.appendChild(Element.createChildNode({
          name: 'span',
          className: ['card-title-edit'],
        }))

        p.appendChild(Element.createChildNode({
          name: 'span',
          className: ['card-title-delete'],
        }))

        cardsDiv.appendChild(p)
        newDiv.appendChild(cardsDiv)
      }
    })
  } else {
    newDiv.appendChild(cardsDiv)
  }
}