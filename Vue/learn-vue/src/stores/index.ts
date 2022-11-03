/**
 * vuex
 *  - store本质是一个容器 包含应用中大部分数据
 *  - state
 *  - getters
 *    + 从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数;类似computed
 *  - mutations
 *    + 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)
 *  - action
 *    + action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
 *  - module
 *    + 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
 *      为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
 *    + 默认情况下 模块内部action、mutation仍然是注册全局的命名空间的；这样使多个模块能对同一个action、mutation作出响应；
 *      Getter同样也默认注册在全局命名空间；可以在模块添加namespace：true方式使其成为带命名空间的模块
 *
 *
 *  - 状态获取
 *    + 如果对this.$store.state.xx方式过于繁琐，可以使用mapState 其可以传入数组类型也可对象类型
 *       在选项/组合api中 可以通过mapState和computed混合使用, 使用方法大同小异 组合api有点麻烦
 *       const { name, age } = mapState(["name", "age"]);
 *       const store = useStore();
 *       const yName = computed(name.bind({$store: store}));
 *       在组合api中最合适使用toRefs
 *
 */
