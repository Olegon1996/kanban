import Sortable from 'sortablejs/modular/sortable.core.esm'

import {moveInCurrentColumn, moveInNewColumn} from '../services/api'

export const move = (cards) => {
  let oldCardId = null
  let newCardId = null
  let oldColumnId = null
  let newColumnId = null
  cards.forEach(card => {
    new Sortable.create(card, {
      group: 'name',
      sort: true,
      handle: '.cards-container',
      dragClass: 'swipe-class',
      animation: 250,
      ghostClass: 'blue-background-class',
      onStart: function (evt) {
        oldCardId = evt.item.getAttribute('value')
        oldColumnId = evt.item.parentNode.getAttribute('value')
      },
      onEnd: function (evt) {
        newCardId = evt.item.getAttribute('value')
        newColumnId = evt.item.parentNode.getAttribute('value')
        if (!evt.pullMode) {
          if (newCardId && newColumnId && oldCardId && oldCardId) {
            moveInCurrentColumn(newColumnId, newCardId, evt.newIndex)
          }
        }
      },
      onAdd: function (evt) {
        newCardId = evt.item.getAttribute('value')
        newColumnId = evt.item.parentNode.getAttribute('value')
        if (newCardId && newColumnId && oldCardId && oldCardId) {
          moveInNewColumn(oldColumnId, newColumnId, oldCardId, newCardId, evt.newIndex)
        }
      },
    })
  })
}

