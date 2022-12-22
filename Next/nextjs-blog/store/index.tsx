import { createContext, useContext, useState } from 'react';
import { extendObservable, makeAutoObservable } from 'mobx';
import UserStore from './userStore';

// 所有组件共享的 store对象
export let observableStore: any = null;

export const StoreContext = createContext(Object.create(null));

class RootStore {
  userStore: any = null;
  number = 1;
  constructor() {
    this.userStore = new UserStore(this);
    makeAutoObservable(this);
  }
}

// 创建 store 对象
const createStore = () => {
  return new RootStore();
};

// store 初始化
export const initStore = () => {
  observableStore = createStore();
};

// store hook
export const useStore = () => {
  let store = useContext(StoreContext);
  if (!store) {
    console.warn(`Store has not been initialized.`);
    return {};
  }
  return store;
};

// store Layout components
export const StoreProvider = ({ children }: any) => {
  const [store] = useState(() => observableStore);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

