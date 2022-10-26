<template>
  <h2>Category Component</h2>
</template>
<script lang="ts">
export default {
  name: 'Category',
  mounted() {
    console.log('Category mount')
  },
  unmounted() {
    console.log('Category Unmount')
  }
}
</script>