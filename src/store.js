import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { compose } from 'redux' ???????????????
import thunk from 'redux-thunk';

import currentUser from './reducers/currentUser'
import exercises from './reducers/exercises'
import diaries from './reducers/diaries'
import meals from './reducers/meals'
import foods from './reducers/foods'
import mealFoods from './reducers/mealFoods'

// could separate this into a separate rootReducer file
const reducer = combineReducers({
  currentUser,
  exercises,
  diaries,
  meals,
  foods,
  mealFoods
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

export default store
