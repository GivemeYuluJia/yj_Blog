import { FETCH_PERSONAL_DATA } from '../actions/personsl';

const initialState = {
  userInfo: {}
}

export default (state = initialState, action) =>{ 
  switch(action.type) {
    case FETCH_PERSONAL_DATA: 
      return action.payload
    default:
      return state
  }
}