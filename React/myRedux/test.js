const createStore = require('./createStore');
 
const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'inc':
      return state + 1;
    case 'dec':
      return state - 1;
    default:
      return state
  }
}

const store = createStore(reducer);
const { subscribe, getState, dispatch } = store;

subscribe(() => {
  const state = getState();
  console.log(state);
})

dispatch({
  type: 'inc'
})