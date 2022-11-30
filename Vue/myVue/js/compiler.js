class Compiler {
  // vue实例
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.compile(this.el);
  }
  // 编译模版
  compile(el) {
    let childrenNodes = [...el.childNodes];
    childrenNodes.forEach(node => {
      // 根据不同的节点类型进行编译
      // 文本类型的节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        //元素节点
        this.compileElement(node)
      };
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }
  // 编译文本节点(简单的实现)
  compileText(node) {
    // 核心思想利用把正则表达式把{{}}去掉找到里面的变量
    // 再去Vue找这个变量赋值给node.textContent
    let reg = /\{\{(.+?)\}\}/
    // 获取节点的文本内容
    let val = node.textContent
    // 判断是否有 {{}}
    if (reg.test(val)) {
      // 获取分组一  也就是 {{}} 里面的内容 去除前后空格
      let key = RegExp.$1.trim();
      // 进行替换再赋值给node
      node.textContent = val.replace(reg, this.vm[key]);
      // 创建观察者
      new Watcher(this.vm, key, newValue => {
        // node.textContent = newValue
        node.textContent = val.replace(reg, newValue);
      })
    }
  }
  // 编译元素节点这里只处理指令
  compileElement(node) {
    // 获取到元素节点上面的所有属性进行遍历
    Array.from(node.attributes).forEach((attr) => {
      // 获取属性名
      let attrName = attr.name
      console.log(attr.name, '===')
      // 判断是否是 v- 开头的指令
      if (this.isDirective(attrName)) {
        // 除去 v- 方便操作
        attrName = attrName.substr(2)
        // 获取 指令的值就是  v-text = "msg"  中msg
        // msg 作为 key 去Vue 找这个变量
        let key = attr.value
        console.log(attrName, '===', key)
        // 指令操作 执行指令方法
        // vue指令很多为了避免大量个 if判断这里就写个 uapdate 方法
        this.update(node, key, attrName)
      }
    })
  }
  // 添加指令方法 并且执行
  update(node, key, attrName) {
    // 比如添加 textUpdater 就是用来处理 v-text 方法
    // 我们应该就内置一个 textUpdater 方法进行调用
    // 加个后缀加什么无所谓但是要定义相应的方法
    let updateFn = this[attrName + 'Updater']
    // 如果存在这个内置方法 就可以调用了
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }
  // 处理v-text
  textUpdater(node, value, key) {
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }
  // 处理v-model
  modelUpdater(node, value, key) {
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value;
    });
  }

  // 判断元素的属性是否是 vue 指令
  isDirective(attr) {
    return attr.startsWith('v-')
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
  // 判断是否是 文本 节点
  isTextNode(node) {
    return node.nodeType === 3
  }
}