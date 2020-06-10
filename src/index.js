import {database} from './firebase'

import {getUserData} from './services/api'

import './styles/style.scss'
import './styles/loader.css'

import {Element} from './features/Element'
import {logout} from "./services/authApi";

const isLogin = localStorage.getItem('token')
if (isLogin) {
  getUserData()

  const element = new Element()

  element.renderColumns()
  element.openInputToCreate()
  element.toggleColumn()
  element.onChangeInput()

  const ref = database.ref('users')
  ref.on('child_changed', function (snapshot) {
    if (snapshot && snapshot.val()) {
      element.renderColumns()
    }
  })
}


const logoutBtn = document.getElementById('logOut')
logoutBtn.addEventListener('click', () => {
  logout().then(() => {
    window.open('./index.html', '_self')
    localStorage.removeItem('token')
  })
})