<template>
  <h2>About Component</h2>
</template>
<script lang="ts">
export default {
  name: 'About',
  activated() {
    console.log('About activated')
  },
  deactivated() {
    console.log('About deactivated')
  }
}
</script>