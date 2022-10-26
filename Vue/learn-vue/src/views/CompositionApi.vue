<template>
  <div>
    123
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
/**
 * 定义响应式数据
 *  - 1. reactive 定义复杂的对象, 不能传入基本数据类型
 *    - 多应用于本地数据
 *    - 多个数据之间有关联/联系
 *  - 2. ref 定义简单的数据, 也可以是对象; 返回一个可变的响应式对象 该对象作为一个响应式引用 维护着它内部的值
 *  - 3. readonly 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。
 */
const account = reactive({
  username: 'yj',
  password: '123'
})
</script>