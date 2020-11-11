// synchronous actions
export const setDiaries = diaries => {
  return {
    type: "SET_DIARIES",
    diaries
  }
}

export const clearDiaries = () => {
  return {
    type: "CLEAR_DIARIES"
  }
}

export const addDiary = diary => {
  return {
    type: "ADD_DIARY",
    diary
  }
}


// asychronous actions
const baseUrl = "http://localhost:3001/api/v1/diaries"

export const getDiaries = () => {
  return dispatch => {
    return fetch(baseUrl, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setDiaries(json.data))
        }
      })
      .catch(console.log())
  }
}

export const createDiary = (diaryDate, currentUser, history) => {
  const diary = {
    user_id: currentUser.id,
    date: diaryDate,
  }

  return dispatch => {
    return fetch(baseUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(diary)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(addDiary(json.data))
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}
