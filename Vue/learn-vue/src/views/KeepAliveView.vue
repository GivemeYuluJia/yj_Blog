<template>
  <div class="keepAlive">
    <div class="tabs">
      <template v-for="item, index in tabs" :key="item">
        <button
          :class="{active: currentIndex === index}"
          @click="handleClick(index)"
        >
          {{item}}
        </button>
      </template>
    </div>
    <div class="view">
      <!-- 可以通过 include 和 exclude prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组 -->
      <KeepAlive include="Home,About">
        <component :is="tabs[currentIndex]"></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script lang="ts">
import Home from '../components/KeepAlive/Home.vue';
import About from '../components/KeepAlive/About.vue';
import Category from '../components/KeepAlive/Category.vue';
// <KeepAlive> 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。
// 对于缓存组件来说 再次进入 不会执行created和mounted 需要用到activated和deactivated
// activated 在组件挂载时也会调用，并且 deactivated 在组件卸载时也会调用。
export default {
  components: {
    Home,
    About,
    Category
  },
  data(){
    return {
      tabs: ["Home", "About", "Category"],
      currentIndex: 0
    }
  },
  methods: {
    handleClick(item: number) {
      this.currentIndex = item
    }
  }
}
</script>
<style scoped>
.active {
  color: red;
}
</style>