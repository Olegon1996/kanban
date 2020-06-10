export const getUserData = async () => {
  try {
    const userId = localStorage.getItem('token')
    if (userId) {
      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}.json`)
      const data = await response.json()
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'none'
      return data
    }
  } catch (e) {
    throw new Error(e)
  }
}


export const moveInCurrentColumn = async (columnId, oldTaskId, newPositionNumber) => {
  try {
    const userId = localStorage.getItem('token')
    if(userId) {
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'flex'

      const getTasksResponse = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/tasks/${oldTaskId}/.json`)
      const getTaskData = await getTasksResponse.json()

      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/tasks/${oldTaskId}/.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...getTaskData,
          positionNumber: newPositionNumber === 0 ? 0 :newPositionNumber
        })
      })
      loader.style.display = 'none'
      return response.status
    }
  } catch (e) {
    const loader = document.querySelector('.loader-container')
    loader.style.display = 'flex'
    throw new Error(e)
  }
}

export const moveInNewColumn = async (oldColumnId, newColumnId, oldTaskId, newTaskId, newPositionNumber) => {
  try {
    const userId = localStorage.getItem('token')
    if(userId) {
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'flex'

      const getTasksResponse = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${newColumnId}/tasks/.json`)
      const getTasksData = await getTasksResponse.json()

      const getOldTaskValue = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${oldColumnId}/tasks/${oldTaskId}.json`)
      const oldTask = await getOldTaskValue.json()

      await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${oldColumnId}/tasks/${oldTaskId}/.json`, {
        method: 'DELETE'
      })

      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${newColumnId}/tasks/.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...getTasksData,
          [new Date().getTime()]: {
            value: oldTask.value,
            cardId: new Date().getTime(),
            positionNumber: newPositionNumber === 0 ? 0 : newPositionNumber - 1
          }
        })
      })
      return response.status
    }
  } catch (e) {
    const loader = document.querySelector('.loader-container')
    loader.style.display = 'none'
    throw new Error(e)
  }
}
