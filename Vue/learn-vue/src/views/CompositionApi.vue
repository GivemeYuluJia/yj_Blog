<template>
  <div>
    <input v-focus type="text">
    123
    <Ref />
  </div>
</template>
<script setup lang="ts">
import Ref from '../components/Composition/Ref.vue';
import { reactive } from 'vue';

const vFocus = {
  // 生命周期函数(自定义指令)
  mounted(el, bindings) {
    console.log(bindings, 'bindings')
    el?.focus();
  }
};
/**
 * watch 和 watchEffect
 *  - watch用于手动指定监听的数据源.
 *    + 默认情况下 它是惰性的 只有当被监听的源发生变化才会执行回掉
  *     immediate?: boolean // 默认：false; 在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
  *     deep?: boolean // 默认：fals; 如果源是对象，强制深度遍历，以便在深层级变更时触发回调。
  *     flush?: 'pre' | 'post' | 'sync' // 默认：'pre'; 调整回调函数的刷新时机
  *     onTrack?: (event: DebuggerEvent) => void; 调试侦听器的依赖
  *     onTrigger?: (event: DebuggerEvent) => void
  * 
 *  - watchEffect 用于自动收集响应式数据依赖
 *    + 回调函数会被立刻执行一次 并且在执行过程中会收集依赖
 *    + 只有依赖发生变化时,watchEffect传入函数才会再次执行
 *  
 *  返回值是一个用来停止该副作用的函数。
 * 
 *  与watchEffect相比
 *    - 懒执行副作用；
 *    - 更加明确是应该由哪个状态触发侦听器重新执行；
 *    - 可以访问所侦听状态的前一个值和当前值。
 */
/**
 * 定义响应式数据
 *  - 1. reactive 定义复杂的对象, 不能传入基本数据类型
 *    + 多应用于本地数据
 *    + 多个数据之间有关联/联系
 *  - 2. ref 定义简单的数据, 也可以是对象; 返回一个可变的响应式对象 该对象作为一个响应式引用 维护着它内部的值
 *  - 3. readonly 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。
 * 
 * 浅层代理
 *  - 1.shallowRef ref() 的浅层作用形式
 *      + 和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。
 *  - 2.shallowReactive reactive() 的浅层作用形式。
 *    + 和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
 *  - 3.shallowReadonly readonly() 的浅层作用形式
 *    + 和 readonly() 不同，这里没有深层级的转换：只有根层级的属性变为了只读。属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
 *  - 4.triggerRef 强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用
 * 
 * 转换响应式数据
 *  - toRef 基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然
 *  - toRefs 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。
 *  - toRaw 根据一个 Vue 创建的代理返回其原始对象。
 *    + toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。
 *  - unref 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
 */
const account = reactive({
  username: 'yj',
  password: '123'
})
/**
 * Reactive判断Api
 *  - 1.isProxy 检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。
 *  - 2.isReactive 检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。
 *    + 如果该代理是readonly建的 但包裹由reactive创建的另一个代理 依然返回true
 *  - 3.isReadonly 检查一个对象是否是由 readonly() 或 shallowReadonly() 创建的代理。
 *  - 4.isRef 检查某个值是否为 ref。
 */
</script>