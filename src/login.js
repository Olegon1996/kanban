import './styles/login.css'

import {login, registration} from './services/authApi'

const form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = form.email.value
  const password = form.password.value
  if(email && password) {
    registration(email, password).then(response => {
      if(response.message === 'The email address is already in use by another account.') {
        login(email, password).then(res => {
          if(res.message === 'The password is invalid or the user does not have a password.') {
            alert(res.message)
          }else {
            localStorage.setItem('token', res.uid)
            window.open('trello.html', '_self')
          }
        })
      }
    })
  } else {
    alert('Заповніть всі поля')
  }
})