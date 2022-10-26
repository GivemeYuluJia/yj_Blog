<template>
  <div class="refs">
    {{message}}
    <Banner ref="banner" />
    <button @click="handleClick">获取refs</button>
  </div>
</template>
<script lang="ts">
import Banner from "../components/Banner.vue";
export default {
  components: {
    Banner
  },
  data() {
    return {
      message: `如果用于普通 DOM 元素,引用将是元素本身;如果用于子组件，引用将是子组件的实例;
      this.$refs 也是非响应式的,因此你不应该尝试在模板中使用它来进行数据绑定。`
    }
  },
  methods: {
    handleClick() {
      // 获取组件实例
      console.log(this.$refs.banner);
      // 获取组件中的元素
      console.log((this.$refs as any).banner.$el);
      // 访问组件中的方法
      (this.$refs as any).banner.bannerclick();
    }
  }
}
</script>