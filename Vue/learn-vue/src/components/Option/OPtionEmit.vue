<template>
  <div class="add">
    <button @click="addClick(1)">+1</button>
    <button @click="addClick(5)">+5</button>
    <button @click="addClick(10)">+10</button>
    <button @click="subClick(1)">-1</button>
    <button @click="subClick(5)">-5</button>
    <button @click="subClick(10)">-10</button>
  </div>
</template>
<script>
  /**
   * 父传子 通过props属性
   * 子传父 通过emit
   * 
   * 子组件传父组件 - 如子组件一些事件发生时候 组件中发生点击 父组件要切换内容/子组件有一些内容要传递给父组件
   * 实现：
   * 1. 在子组件定义某些情况下触发事件名
   * 2. 在父组件中以v-on方式传入药监听事件名 并绑定在对应的方法中
   * 3. 在子组件发生某个事件时候 根据事件名称处罚对应事件
   */
  export default {
    // emit数组语法
    // emits: ["add", "sub"]
    // 对象写法可用于事件验证 return false时候会有警告 但还是会发送出去
    emits: {
      add: (count) => {
        return true
      },
      sub: (count) => {
        return true
      }
    },
    methods: {
      addClick: function(count) {
        this.$emit("add", count)
      },
      subClick: function(count) {
        this.$emit("sub", count)
      }
    }
  }
</script>