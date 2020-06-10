export const createCard = async (newColumn, newTask,) => {
  try {
    const userId = localStorage.getItem('token')
    if (userId) {
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'flex'

      const getUserResponse = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/.json`)
      const getUserData = await getUserResponse.json()

      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...getUserData,
          columns: {
            ...getUserData.columns,
            [newColumn]: {
              ...getUserData.columns[newColumn],
              tasks: {
                ...getUserData.columns[newColumn].tasks || {},
                [new Date().getTime()]: {
                  value: newTask,
                  cardId: new Date().getTime(),
                  positionNumber: getUserData.columns[newColumn].tasks
                    ? Object.values(getUserData.columns[newColumn].tasks).length
                    : 0
                }
              },
            }
          }
        })
      })
      const data = await response.json()
      loader.style.display = 'none'
      return data
    }
  } catch (e) {
    const loader = document.querySelector('.loader-container')
    loader.style.display = 'none'
    throw new Error(e)
  }
}

export const editCardItem = async (columnId, taskId, value) => {
  try {
    const userId = localStorage.getItem('token')
    if (userId) {
      const getTasksResponse = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/tasks/${taskId}/.json`)
      const getTaskData = await getTasksResponse.json()

      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/tasks/${taskId}/.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...getTaskData,
          value
        })
      })
      return await response.json()
    }

  } catch (e) {
    throw new Error(e)
  }
}

export const deleteOneCard = async (columnId, taskId) => {
  try {
    const userId = localStorage.getItem('token')
    if(userId) {
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'flex'
      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/tasks/${taskId}/.json`, {
        method: 'DELETE'
      })
      loader.style.display = 'none'
      return response.status
    }
  } catch (e) {
    const loader = document.querySelector('.loader-container')
    loader.style.display = 'none'
    throw new Error(e)
  }
}