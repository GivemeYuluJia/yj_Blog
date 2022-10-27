<template>
  <div ref="myRef">
    ref
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// 只需要定一个一个ref对象 绑定到元素或组件ref熟悉上即可
const myRef = ref(null);
</script>