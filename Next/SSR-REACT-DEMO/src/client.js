import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStoreIntstance from '../store';
import Routes from './routes';

const store = createStoreIntstance(window.__PRELOAD_STATE__)
console.log(window.__PRELOAD_STATE__, '??', store)
ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
