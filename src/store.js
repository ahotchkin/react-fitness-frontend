import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { compose } from 'redux' ???????????????
import thunk from 'redux-thunk';

import users from './reducers/users'
import currentUser from './reducers/currentUser'
import loginForm from './reducers/loginForm'
import exercises from './reducers/exercises'

const reducer = combineReducers({
  users,
  currentUser,
  loginForm,
  exercises
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

export default store
