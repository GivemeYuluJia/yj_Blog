<template>
  <div>
    <h1>生命周期——lifecycle</h1>
    {{count}}
    <button @click="handleUpdate">update</button>
  </div>
</template>
<script>
/** 
 * 
 */
export default {
  // 1. 组件创建之前 在实例初始化完成、props 解析之后、data() 和 computed 等选项处理之前立即调用
  beforeCreate() {
    console.log('beforeCreate')
  },
  // 2. 组件创建完成 已经设置完成 响应式数据、计算属性、方法和侦听器。然而，此时挂载阶段还未开始，因此 $el 属性仍不可用。
  created() {
    console.log('created')
  },
  // 3.组件准备挂载
  beforeMount() {
    console.log('beforeMount')
  },
  /** 4. 组件挂载之后调用 组件在以下情况下被视为已挂载
  *  - 所有同步子组件都已经被挂载
  *  - 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。
  */
  mounted() {
    console.log('mounted')
  },
  /** 5.将因为一个响应式状态变更而更新其 DOM 树之前调用。
   *  可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的
  */
 beforeUpdate() {
  console.log('beforeUpdate')
 },
 /** 6.因为一个响应式状态变更而更新其 DOM 树之后调用; 父组件的更新钩子将在其子组件的更新钩子之后调用。
  * 这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代
  */
 updated() {
  console.log('updated')
 },
 /** 7.在一个组件实例被卸载之前调用。
  * 当这个钩子被调用时，组件实例依然还保有全部的功能。
  */
 beforeUnmount() {
  console.log('beforeUnmount')
 },
 /** 8. 在一个组件实例被卸载之后调用。
  * 其所有子组件都已经被卸载。所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止。
  * 可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。
  */
  unmounted() {
  console.log('unmounted')
 },
 data() {
  return {
    count: 0
  }
 },
 methods: {
  handleUpdate() {
    this.count++;
  }
 }
}
</script>