<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <div class="center">
      <slot name="center">center</slot>
    </div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
  .nav-bar {
    display: flex;
  }
  .left {
    width: 80px;
    background-color: yellowgreen;
  }
  .center {
    flex: 1;
    background-color: aqua;
  }
  .right {
    width: 80px;
    background-color: palevioletred;
  }
</style>