import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
const store = createStore(reducer, applyMiddleware(thunk));

export default function createStoreIntstance(preloadState = {}) {
  return createStore(reducer, preloadState, applyMiddleware(thunk));
}
