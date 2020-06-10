import {createCard, deleteOneCard, editCardItem} from '../services/cardApi'
import {createColumn, deleteColumn, editColumnTitle} from '../services/columnApi'

import {renderCol} from './renderColumn'
import {carRender} from './renderCard'
import {openForm} from './openForm'


export class Element {
  constructor() {
    this.value = ''
    this.tardet = ''
    this.cardValue = ''
    this.addNewBlock = document.querySelector('.add-new-column')
    this.addNewInput = document.querySelector('.add-column-input')
    this.addNewSpan = document.querySelector('.add-span')
    this.selectBlock = document.querySelector('.select-block')

    this.createBtn = document.querySelector('.create')
    this.cancelBtn = document.querySelector('.cancel')
    this.column = document.querySelector('.column')

    this.createCardBtn = ''
    this.cancelCardBtn = ''
    this.editTitleBtn = ''
  }

  static createChildNode(element) {
    const newElement = document.createElement(element.name)
    if (element.className) {
      element.className.forEach(e => {
        newElement.classList.add(e)
      })
    }
    if (element.text) {
      newElement.innerHTML = element.text
    }
    if (element.columnId || element.columnId === 0) {
      newElement.setAttribute('value', element.columnId)
    }
    return newElement
  }


  openInputToCreate() {
    this.addNewBlock.addEventListener('click', () => {
      this.addNewInput.style.display = 'flex'
      this.addNewInput.focus()
      this.addNewSpan.style.display = 'none'
      this.selectBlock.style.display = 'flex'
    })
  }

  onChangeInput() {
    this.addNewInput.addEventListener('change', (e) => {
      this.value = e.target.value
    })
  }

  addCard() {
    const addCards = document.querySelectorAll('.add-card')
    addCards.forEach(node => {
      node.addEventListener('click', (e) => {
        this.tardet = e.target
        node.innerHTML = openForm('Додати', 'Додати', 'Відмінити')

        this.createCardBtn = document.querySelector('.create-card')
        this.cancelCardBtn = document.querySelector('.cancel-card')

        node.children[0].childNodes[1].focus()
        node.classList.remove('before-class')
        this.toggleCard(node)
      })
    })

    document.addEventListener('click', () => {
      addCards.forEach(c => {
        if (c !== this.tardet) {
          if (!c.className.includes('before-class')) {
            c.innerHTML = 'Додати карточку'
            c.classList.add('before-class')
          }
        }
      })
    })
  }

  editTitle() {
    this.editTitleBtn = document.querySelectorAll('.column-title-edit')
    this.editTitleBtn.forEach(edit => {
      edit.addEventListener('click', (e) => {
        e.stopPropagation()
        edit.parentNode.innerHTML = openForm('Змінити', 'Зберегти', 'Відмінити')
        document.querySelector('.add-column-input').focus()
        this.toggleTitle(edit)
      })
    })
  }

  deleteColumn() {
    const deletes = document.querySelectorAll('.column-title-delete')
    deletes.forEach(del => {
      del.addEventListener('click', (e) => {
        e.stopPropagation()
        const conf = confirm('Бажаєте видалити колонку?')
        if (conf) {
          deleteColumn(del.parentNode.parentNode.getAttribute('value'))
          this.renderColumns()
        }
      })
    })
  }

  editCard() {
    const editCard = document.querySelectorAll('.card-title-edit')
    editCard.forEach(edit => {
      edit.addEventListener('click', (e) => {
        e.stopPropagation()
        edit.parentNode.innerHTML = openForm('Змінити', 'Зберегти', 'Відмінити')
        document.querySelector('.add-column-input').focus()
        this.toggleEditCard()
      })
    })
  }

  deleteCard() {
    const deleteCard = document.querySelectorAll('.card-title-delete')
    deleteCard.forEach(del => {
      del.addEventListener('click', () => {
        const conf = confirm('Бажаєте видалити карточку?')
        if (conf) {
          deleteOneCard(del.parentNode.parentNode.getAttribute('value'), del.parentNode.getAttribute('value'))
          this.renderColumns()
        }
      })
    })
  }

  toggleColumn() {
    this.createBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      if (this.addNewInput.value !== '') {
        this.addNewInput.style.display = 'none'
        this.addNewInput.value = ''
        this.addNewSpan.style.display = 'flex'
        this.selectBlock.style.display = 'none'
        createColumn(this.value)
      }
    })

    this.cancelBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.addNewInput.style.display = 'none'
      this.addNewInput.value = ''
      this.addNewSpan.style.display = 'flex'
      this.selectBlock.style.display = 'none'
    })
  }

  toggleEditCard() {
    const editCardSaveBtn = document.querySelector('.save-title')
    const editCancelCancelBtn = document.querySelector('.cancel-title')
    editCardSaveBtn.addEventListener('click', e => {
      e.stopPropagation(e)
      const value = editCardSaveBtn.parentNode.parentNode.childNodes[1].value
      if (value) {
        const currentValue = editCardSaveBtn.parentNode.parentNode.parentNode.getAttribute('value')
        if (currentValue) {
          const cardItem = editCardSaveBtn.parentNode.parentNode
          const id = cardItem.parentNode.parentNode.getAttribute('value')
          editCardItem(id, currentValue, value)
        }
      }
    })
    editCancelCancelBtn.addEventListener('click', e => {
      e.stopPropagation(e)
      this.renderColumns()
    })
  }

  toggleTitle() {
    const editTitleSaveBtn = document.querySelector('.save-title')
    const editTitleCancelBtn = document.querySelector('.cancel-title')
    editTitleSaveBtn.addEventListener('click', e => {
      e.stopPropagation(e)
      const currentValue = editTitleSaveBtn.parentNode.parentNode.childNodes[1].value
      if (currentValue) {
        const columnItem = editTitleSaveBtn.parentNode.parentNode.parentNode.parentNode
        const id = columnItem.getAttribute('value')
        editColumnTitle(id, currentValue)
      }
    })
    editTitleCancelBtn.addEventListener('click', e => {
      e.stopPropagation(e)
      this.renderColumns()
    })
  }

  toggleCard(node) {
    this.createCardBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.cardValue = node.children[0].childNodes[1].value
      if (this.cardValue !== '') {
        node.innerHTML = 'Додати карточку'
        const currentColumn = node.parentNode.getAttribute('value')
        createCard(currentColumn, this.cardValue)
      }
    })

    this.cancelCardBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      node.classList.add('before-class')
      node.innerHTML = 'Додати карточку'
    })
  }

  renderCard(c, newDiv) {
    carRender(c, newDiv)
  }

  renderColumns() {
    renderCol()
  }
}