function createStore(reducer, enhancer) {
  // 定义初始状态
  let currentState = null;
  const listeners = [];

  // 当传入中间件 强化dispatch
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  }

  function getState() {
    return currentState;
  }

  function subscribe (listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }
  // 初始化下state
  dispatch({
    type: 'INIT'
  })
  return {
    dispatch,
    getState,
    subscribe
  }
}

// 中间价 就是个函数
function middleware(dispatch, getState) {
  // 参数为
  return (next) => {
    return (action) => {
      return next(action);
    }
  }
}

// applyMiddleware(a, b, c)  createStore(reducer, applyMiddleWare(a, b, c))
function applyMiddleware(...middlewares) {
  return (createStore) => {
    return (reducer) => { 
      const store = createStore(reducer);
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => store.dispatch(action, ...args)
      };

      const middlewareChain = middlewares.map(middleware => {
        middleware(middlewareAPI)
      })

      const dispatch = compose(...middlewareChain)(store.dispatch);
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) return;
  if (funcs.length === 1) return funcs[0];

  return funcs.reduce((pre, next) => {
    return (...args) => pre(next(...args))
  });
}


module.exports = createStore;