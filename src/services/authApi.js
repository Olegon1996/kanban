import {auth} from '../firebase'

export const login = async (email = 'test@gmail.com', password = '123456') => {
  try {
    const loginResponse = await auth.signInWithEmailAndPassword(email, password)
    return loginResponse.user
  } catch (e) {
    return e
  }
}

export const registration = async (email = 'test@gmail.com', password = '123456', name = 'name') => {
  try {
    const newUser = await auth.createUserWithEmailAndPassword(email, password)
    const response = await fetch(`https://parse-upwork.firebaseio.com/users/${newUser.user.uid}/.json`, {
      method: 'PUT',
      body: JSON.stringify({
        email, password, name, id: newUser.user.uid, created: new Date()
      })
    })
    const data = await response.json()
    localStorage.setItem('token', data.id)
    window.open('trello.html', '_self')
    return response
  } catch (e) {
    return e
  }
}

export const logout = async () => {
  try {
    await auth.signOut()
    return 'success logout'
  } catch (e) {
    return e
  }
}