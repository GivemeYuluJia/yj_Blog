class Watcher {
  constructor(vm, key, cb) {
    // vm 是 Vue 实例
    this.vm = vm;
    // key 是 data 中的属性
    this.key = key;
    // cb 回调函数 更新视图的具体方法
    this.cb = cb;
    // 把观察者的存放在 Dep.target
    Dep.target = this
    // 旧数据 更新视图的时候要进行比较
    // 还有一点就是 vm[key] 这个时候就触发了 get 方法
    // 之前在 get 把 观察者 通过dep.addSub(Dep.target) 添加到了 dep.subs中
    this.oldValue = vm[key]
    // Dep.target 就不用存在了 因为上面的操作已经存好了
    Dep.target = null
  }
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.cb(newValue);
  }
}