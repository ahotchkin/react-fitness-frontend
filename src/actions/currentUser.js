// synchronous action creators
export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
    // or payload: user
  }
}


// aysnchronous action creators
export const login = credentials => {
  console.log("credentials are", credentials)
  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    return fetch("http://localhost:3001/api/v1/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      // .then(user => dispatch({type: "SET_CURRENT_USER"}))
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch(console.log())
  }
}


export const getCurrentUser = () => {
  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    console.log("DISPATCHING CURRENT USER")
    return fetch("http://localhost:3001/api/v1/get_current_user", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      // .then(user => dispatch({type: "SET_CURRENT_USER"}))
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch(console.log())
  }
}
