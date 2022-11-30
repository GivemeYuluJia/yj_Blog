class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
    this.$data = options.data || {};
    // 把data中的数据转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data);
    new Obsever(this.$data);
    // 调用complier对象，解析指令和差值表达式
    new Compiler(this);
  }

  _proxyData(data) {
    // 遍历data所有属性
    Object.keys(data).forEach(key => {
      // 把data的属性注入到vue实例中
      Object.defineProperty(this, key, {
        // 设置可以枚举
        enumerable: true,
        // 设置可以配置
        configurable: true,
        // 获取数据
        get() {
          return data[key]
        },
        // 设置数据
        set(newValue) {
          // 判断新值和旧值是否相等
          if (newValue === data[key]) return
          // 设置新值
          data[key] = newValue
        },
      })
    })
  }
}