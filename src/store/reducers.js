import { combineReducers } from 'redux'
import locationReducer from './location'
import userReducer from './userReducer' // yeni eklendi
import foodReducer from './foodReducer' // yeni eklendi

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user : userReducer, // yeni eklendi
    food: foodReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
