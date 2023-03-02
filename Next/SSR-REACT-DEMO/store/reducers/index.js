import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from './home';
import personalReducer from './personal';

export default combineReducers({
  home: homeReducer,
  personal: personalReducer,
})