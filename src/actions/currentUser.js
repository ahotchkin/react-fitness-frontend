// only needed since LoginForm is in Redux, not react
// import { resetLoginForm } from './loginForm'
// import { resetSignUpForm } from './signUpForm'
import { getExercises } from './exercises';
import { clearExercises } from './exercises';


// synchronous action creators
export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
    // or payload: user
  }
}


// aysnchronous action creators
// pass in history prop
export const login = (credentials, history) => {
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
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
          // only needed because Login is in Redux and not React
          // dispatch(resetLoginForm())

          // tells your app which path to go to once logged in
          history.push("/")
        }
      })
      .catch(console.log())
  }
}

export const signUp = (credentials, history) => {
  console.log("credentials are", credentials)
  const userInfo = {
    user: credentials
  }
  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    return fetch("http://localhost:3001/api/v1/signup", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
          // only needed because Login is in Redux and not React
          // dispatch(resetSignUpForm())

          history.push("/")
        }
      })
      .catch(console.log())
  }
}

// this takes care of clearing the session, also need to clear out the user in the store with clearCurrentUser
export const logout = () => {
  return dispatch => {
    // don't need to wait until fetch request resolves to log out a user, when a user clicks logout they should logout right away. call clearCurrentUser immediately
    // optimistic => make the change to the frontend right away, don't wait for the backend
    // pessimistic => hold on, make sure the server is running, the response we said works and the backend is all set before changing anything on the frontend and displaying anything to the user
    dispatch(clearCurrentUser())
    dispatch(clearExercises())
    return fetch("http://localhost:3001/api/v1/logout", {
      credentials: "include",
      method: "DELETE"
    })

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
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
        }
      })
      .catch(console.log())
  }
}

// get rid of the currentUser that is sitting in Redux store
export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER"
  }
}
