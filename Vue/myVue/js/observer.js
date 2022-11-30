class Obsever {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    if(!data || typeof data !== 'object') return;
    let dep = new Dep();
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key], dep)
    })
    console.log(dep)
  }

  // 转为响应式
  // 要注意的 和vue.js 写的不同的是
  // vue.js中是将 属性给了 Vue 转为 getter setter
  // 这里是 将data中的属性转为getter setter
  defineReactive(obj, key, value, dep) {
    // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
    this.walk(value);
    let self = this;
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() { 
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        self.walk(newValue);
        dep.notify();
      },
    })
  }
}