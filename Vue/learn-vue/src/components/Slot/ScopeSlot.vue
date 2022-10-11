<template>
  <div class="scope-slot">
    <template v-for="(item, index) in titles" :key="item">
      <div class="item">
        <slot :item="item">{{item}}</slot>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style>
  .scope-slot {
    display: flex;
  }
  .item {
    border: 1px solid skyblue;
    margin-right: 5px;
  }
</style>