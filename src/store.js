import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { compose } from 'redux' ???????????????
import usersReducer from './reducers/users'
import thunk from 'redux-thunk';


const reducer = combineReducers({
  users: usersReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

export default store
