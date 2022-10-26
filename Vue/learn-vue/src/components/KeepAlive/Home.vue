<template>
  <div>
    <h2>Home Component</h2>
    <button @click="handleAdd">add</button>
    {{count}}
  </div>
</template>
<script lang="ts">
export default {
  name: 'Home',
  data() {
    return {
      count: 0
    }
  },
  activated() {
    console.log('Home activated')
  },
  created() {
    console.log('Home created')
  }, 
  mounted() {
    console.log('Home mount')
  },
  deactivated() {
    console.log('Home deactivated')
  },
  methods: {
    handleAdd() {
      this.count++;
    }
  }
}
</script>