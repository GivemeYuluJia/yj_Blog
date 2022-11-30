<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Transition name="fade">
      <p v-if="show">hello</p>
    </Transition>
    <button @click="aShow = !aShow">Toggle</button>
    <Transition name="bounce">
      <p v-if="aShow" style="margin-top: 20px; text-align: center;">
        Hello here is some bouncy text!
      </p>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const aShow = ref(false);
/**
 * 1.v-enter-from：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
 * 2.v-enter-active：进入动画的生效状态。应用于整个进入动画阶段。
 *   在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
 * 3.v-enter-to：进入动画的结束状态。在元素插入完成后的下一帧被添加 
 *   (也就是 v-enter-from 被移除的同时)，在过渡或动画完成之后移除。
 * 4.v-leave-from：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
 * 5.v-leave-active：离开动画的生效状态。应用于整个离开动画阶段。
 *   在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
 * 6.v-leave-to：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 
 *   (也就是 v-leave-from 被移除的同时)，在过渡或动画完成之后移除。
 * v-enter-active 和 v-leave-active 给我们提供了为进入和离开动画指定不同速度曲线的能力，
 *  
 * 原生CSS动画 和 CSS transition 的应用方式基本上是相同的，
 * 只有一点不同，那就是 *-enter-from 不是在元素插入后立即移除，而是在一个 animationend 事件触发时被移除。
 * 对于大多数的 CSS 动画，我们可以简单地在 *-enter-active 和 *-leave-active class 下声明它们。
 */
</script>
<style>
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>