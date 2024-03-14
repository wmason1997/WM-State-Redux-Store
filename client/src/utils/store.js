// Creates a Redux store that holds the state of the app. Only one store should exist.
// import { createStore } from 'redux';

// from https://redux.js.org/introduction/why-rtk-is-redux-today
import { configureStore, Tuple } from '@reduxjs/toolkit';

// Importing the reducer file that is mostly unchanged
import rootReducer from './reducers';

// According to https://redux.js.org/tutorials/fundamentals/part-1-overview

export default configureStore(rootReducer);