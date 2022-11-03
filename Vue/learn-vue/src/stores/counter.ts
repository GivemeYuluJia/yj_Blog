import { ref, computed } from "vue";
import { defineStore } from "pinia";

/**
 *  与vuex区别
 *    - mutations 不再存在。
 *      + 他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。
 *    - 更友好的typescript支持，vuex对ts支持不太友好
 *    - 不再有modules的嵌套结构 在pinia中可以灵活使用每一个store，通过扁平化方式来相互使用
 *    - 也不再有命名空间的概念 不需要记住它们复杂关系
 *
 * state 是 store核心部分 因为store是用来帮助我们管理状态的
 *  - 在pinia中 状态被定义为返回初始状态的函数
 *  - 通过store.count直接修改store中count
 *  - 通过调用 store 上的 $reset() 方法将状态 重置 到其初始值
 *  - 调用 $patch 方法。 它允许您使用部分“state”对象同时应用多个更改，但是，使用这种语法应用某些突变非常困难或代价高昂；$patch 方法也接受一个函数来批量修改集合内部分对象的情况。
 *  - 将其 $state 属性设置为新对象来替换 Store 的整个状态
 *  - 可以通过 store 的 $subscribe() 方法查看状态及其变化
 *  - 解构 为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。 当您仅使用 store 中的状态但不调用任何操作时，这很有用。
 *
 * getter 完全等同于 Store 状态的 计算值
 *  - optionApi中 getter中 函数可以通过参数获取state，this指向store
 *  - 可以通过this访问其他getter
 * Actions 相当于组件中的 methods，非常适合定义业务逻辑
 */
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
