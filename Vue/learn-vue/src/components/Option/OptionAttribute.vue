<template>
  <div class="info">
    <h2>姓名: {{name}}</h2>
    <h2>年龄: {{$attrs.age}}</h2>
  </div>
  <div class="other" v-bind="$attrs"></div>
</template>
<script>
  /**
   * 当传递给一个组件某个属性 但该属性并没有定义对应的props或emit 称之为非props的Attribute/“透传 attribute”
   * 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。
   * 常见包括class、style、id等属性；
   * 我们可以通过$attrs来访问非props的attribute
   */
  export default {
    // 如果不希望组件的根元素继承attribute 禁用Attribute继承和多根节点
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        required: true,
        default: 'yy'
      }
    }
  }
</script>