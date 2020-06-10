export const createColumn = async (newColumn) => {
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
            [new Date().getTime()]: {
              columnName: newColumn,
              created: new Date().getTime(),
              columnId: new Date().getTime()
            },
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

export const editColumnTitle = async (columnId, newColumn) => {
  try {
    const userId = localStorage.getItem('token')
    if (userId) {
      console.log(newColumn)
      const getUserResponse = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/.json`)
      const getUserData = await getUserResponse.json()
      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/.json`, {
        method: 'PUT',
        body: JSON.stringify({
          ...getUserData,
          columns: {
            ...getUserData.columns,
            [columnId]: {
              ...getUserData.columns[columnId],
              columnName: newColumn,
            },
          }
        })
      })
      return await response.json()
    }

  } catch (e) {
    throw new Error(e)
  }
}

export const deleteColumn = async (columnId) => {
  try {
    const userId = localStorage.getItem('token')
    if(userId) {
      const loader = document.querySelector('.loader-container')
      loader.style.display = 'flex'
      const response = await fetch(`https://parse-upwork.firebaseio.com/users/${userId}/columns/${columnId}/.json`, {
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