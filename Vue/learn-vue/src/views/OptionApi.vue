<script lang="ts">
  export default {
    data: function() {
      /**
       * 1.该函数应当返回一个普通 JavaScript 对象，Vue 会将它转换为响应式对象。
       *    实例创建后，可以通过 this.$data 访问该响应式对象。
       *    组件实例也代理了该数据对象上所有的属性，因此 this.a 等价于 this.$data.a
       * 2.所有会用到的顶层数据属性都应该提前在这个对象中声明。虽然理论上可以向 this.$data 添加新属性，但并不推荐这么做。
       *    如果一个属性的值在一开始还获取不到，应当先用 undefined 或是 null 值来占位，让 Vue 知道这个属性是存在的。
       * 3.以 _ 或 $ 开头的属性将不会被组件实例代理，因为它们可能和 Vue 的内置属性、API 方法冲突。你必须以 this.$data._property 的方式访问它们
       */
      return {
        count: 0,
        firstName: 'y',
        lastName: 'j',
        info: {
          name: 'yj',
          age: 18
        }
      }
    },
    /** 和计算属性区别：计算属性是有缓存的 基于依赖关系进行缓存 在数据不发生变化 计算属性不会重新计算 类似memo */
    methods: {
      handleAdd: function() {
        this.count += 1;
      },
      handleSubtract: function() {
        this.count -= 1;
      },
      handleInfo: function() {
        this.info = {
          name: 'yj 666',
          age: '28 666'
        }
      }
    },
    /** computed用于声明要在组件实例上暴露的计算属性 */
    computed: {
      /** 
       * 对于任何包含响应式数据的复杂逻辑 应该使用计算属性
       * 该选项接收一个对象，其中键是计算属性的名称，值是一个计算属性 getter，或一个具有 get 和 set 方法的对象 (用于声明可写的计算属性)。
       * 所有的 getters 和 setters 会将它们的 this 上下文自动绑定为组件实例。
       * 如果你为一个计算属性使用了箭头函数，则 this 不会指向该组件实例，不过你仍然可以通过该函数的第一个参数来访问实例
       */
      // 只读
      getName: function() {
        return '可读' + this.firstName + this.lastName
      },
      // 可写
      getFullName: {
        get() {
          return '可写' + this.firstName + this.lastName
        },
        set(value) {
          this.lastName += value;
        }
      }
    },
    /** watch 用于声明在数据更改时调用的侦听回调。 
     * watch选项期望接受一个对象 其中键是需要侦听的响应式组件实例属性(如通过data、computed声明的属性)——值是相应的回调函数/字符串/对象
     * watch对应为string则是绑定method上函数，为array 监听可以绑定多个方法
     * 需要侦听复杂的数据源，可以在生命周期使用命令式的 $watch() API。
    */
    watch: {
      // info(oldValue, newValue) {
      //   console.log('监听info变化', oldValue, newValue);
      // }
      info: {
        // handle是上面函数写法语法糖
        handler(oldValue, newValue) {
          console.log('监听info变化', oldValue, newValue);
        },
        immediate: true, // 在侦听器创建时立即触发回调。第一次调用时，旧值将为 undefined。
        // watch并不会监听对象中属性改变只会监听引用地址改变 需要使用deep
        deep: true, // 如果源是对象或数组，则强制深度遍历源，以便在深度变更时触发回调
        // flush - 调整回调的刷新时机
        // onTrack / onTrigger - 调试侦听器的依赖关系
      }
    }
  }
</script>

<template>
  <div>
    {{count}}
    <button @click="handleAdd">点击++</button>
    <button @click="handleSubtract">点击--</button>
    <h2>{{getName}}</h2>
    <h2>{{getFullName}}</h2>
    <button @click="handleInfo">修改info</button>
    <p>name: {{info.name}} - age: {{info.age}}</p>
  </div>
</template>
