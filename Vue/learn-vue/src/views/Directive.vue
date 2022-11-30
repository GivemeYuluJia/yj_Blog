<template>
  <div>
    <div>
      <h2>Custom directive</h2> 
      <input v-focus type="text" name="" id="">
    </div>
    <!--template 元素可以当作不可见包裹元素 并且在v-if使用 最终template不会被渲染 -->
    <!-- 1. v-once 当前元素及其子元素只渲染一次 -->
    <div>
      <h2>1. directive —— v-once</h2> 
      <p v-once>{{message}}</p>
      <button @click="handleChange">change</button>
    </div>
    <hr>
    <!-- 2. 不推荐 v-text通过设置元素的 textContent 属性来工作，因此它将覆盖元素中所有现有的内容。
        如果你需要更新 textContent 的部分，应该使用 mustache interpolations 代替。 
    -->
    <!-- 3. v-html 的内容直接作为普通 HTML 插入—— Vue 模板语法是不会被解析的 -->
    <div>
      <h2>2. directive —— v-html</h2> 
      <p v-html="content"></p>
      <p>{{content}}</p>
    </div>
    <hr>
    <!-- 4. v-pre 跳过元素和它的子元素的编译过程 显示原始的Mustache标签 -->
    <div>
      <h2>3. directive —— v-pre</h2> 
      <p v-pre>{{message}} - {{content}}</p>
    </div>
    <hr>
    <!-- 5. v-memo类似useMemo
      缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。
      如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。传入为空数组效果与v-once一致
    -->
    <div v-memo="[name]">
      <h2>4. directive —— v-memo</h2> 
      <p>{{name}}</p>
      <p>{{age}}</p>
      <button @click="handleChangeInfo">修改信息</button>
    </div>
    <hr>
    <!-- 6.重要 v-bind 动态的绑定一个或多个 attribute(如src、href)，也可以是组件的 prop 缩写 v-bind->: -->
    <div>
      <h2>5. directive —— v-bind</h2> 
      <img :src="imgSrc" alt="" width="20" height="20">
      <!-- class 动态绑定可以用三元 最好使用数组或对象语法 类似classnames -->
      <button :class="{ active: isActive }" @click="handleActive">修改</button>
    </div>
    <hr>
    <!-- 7.重要 v-on给元素绑定事件监听器  
      当监听原生 DOM 事件时，方法接收原生事件作为唯一参数。如果使用内联声明，声明可以访问一个特殊的 $event 变量：v-on:click="handle('ok', $event)"。
      修饰符:  
        - 1. .stop ——调用 event.stopPropagation()。
        - 2. .prevent ——调用 event.preventDefault()。
        - 3. .once ——最多触发一次处理函数。
        - 4. .left ——只在鼠标左键事件触发处理函数。
        - 5. .right ——只在鼠标右键事件触发处理函数。 
    -->
    <div>
      <h2>6. directive —— v-on</h2> 
      <button v-on:click="handleClick">v-on 点击</button>
      <!-- 对象语法 -->
      <!-- <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>    -->
    </div>
    <hr>
    <!-- 8.条件渲染
      v-if 基于表达式值的真假性，来条件性地渲染元素或者模板片段;可用于 <template> 表示仅包含文本或多个元素的条件块。
      v-show 基于表达式值的真假性，来改变元素的可见性 
    -->
    <div>
      <h2>7. directive —— 条件渲染v-if v-show</h2> 
      <template v-if="visible">
        <h2>&nbsp; 7.1 v-if</h2>
        当v-if元素被触发,元素及其所包含的指令/组件都会销毁和重构 
        如果初始条件是假,那么其内部的内容根本都不会被渲染。
      </template>
      <template v-else><h2>v-else</h2>无需传入表达式 但上一个兄弟元素必须有 v-if 或 v-else-if</template>
      <div v-show="visible">
        <h2>&nbsp; 7.2 v-show</h2>
        通过设置内联样式的 display CSS 属性来工作,
        当元素可见时将使用初始 display 值 当条件改变时 也会触发过渡效果。
      </div>
      <button @click="handleIf">visible</button>
    </div>
    <hr>
    <!-- 9.v-for 期望的绑定值类型：Array | Object | number | string | Iterable-->
    <h2>8. directive —— v-for</h2>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
    <hr>
    <!-- 10 v-model 在表单输入元素或组件上创建双向绑定。-->
    <!-- 在checkbox单选下 v-model不管绑定什么值 默认为布尔值 checkbox多选/radio下需要绑定value-->
    <!-- .lazy ——监听 change 事件而不是 input
         .number ——将输入的合法符串转为数字
         .trim ——移除输入内容两端空格
    -->
    <div>
      <h2>9. directive —— v-model</h2>
      <input type="text" v-model="inputMessage">
      <h3>{{inputMessage}}</h3>
      <input type="checkbox" v-model="isAgreee">同意
      {{isAgreee}}<br/>
      <input type="checkbox" v-model="hobbies" value="sing">唱
      <input type="checkbox" v-model="hobbies" value="dump">跳
      <input type="checkbox" v-model="hobbies" value="rap">rap
      {{hobbies}}
    </div>
    <hr>
    <!-- 11. v-slot 用于声明具名插槽或是期望接收 props 的作用域插槽。缩写：#
      具名插槽就是给插槽起一个名字 <slot>元素有一个特殊属性 name
        一个不带name的slot 会带有隐含的名字default
      动态插槽名 可通过v-slot:[slotname]方式动态绑定一个名称
    -->
    <div>
      <h2>10. directive —— v-slot</h2>
      <SlotNav>
        <template v-slot:left>
          <div>返回</div>
        </template>
        <template v-slot:center>
          <div>内容</div>
        </template>
        <template v-slot:right>
          <div>登陆</div>
        </template>
      </SlotNav>
      <SlotNav>
        <template v-slot:[postition]>
          <div>返回</div>
        </template>
      </SlotNav>
      <button @click="handlePostition('left')">left</button>
      <button @click="handlePostition('center')">center</button>
      <button @click="handlePostition('right')">right</button>
      <!--
        如果只有插槽只有默认插槽时 组件标签可以被当作插槽模版使用 即v-slot用在组件上
        如果有默认插槽和具名插槽 要为所有插槽使用完整的基于template语法
      -->
      <ScopeSlot v-slot="props" :titles="list">{{props.item}}</ScopeSlot>
    </div>
    <!-- 不常用 v-cloak 用于隐藏尚未完成编译的 DOM 模板。该指令只在没有构建步骤的环境下需要使用。
      1.当使用直接在 DOM 中书写的模板时，可能会出现一种叫做“未编译模板闪现”的情况：
        用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容。
      2.v-cloak 会保留在所绑定的元素上，直到相关组件实例被挂载后才移除。配合像 [v-cloak] { display: none } 这样的 CSS 规则，
        它可以在组件编译完毕前隐藏原始模板。
    -->
  </div>
</template>
<script lang="ts">
import SlotNav from '../components/Slot/SlotNav.vue';
import ScopeSlot from '../components/Slot/ScopeSlot.vue';
  export default {
    // 局部指令 composition用法见composition
    directives: {
      focus: {
        // 生命周期函数(自定义指令), 第二个参数是获取的绑定对象，内涵修饰符等变量
        mounted(el, bindings) {
          console.log(bindings, 'bindings')
          el?.focus();
        }
      }
    },
    data: function() {
      return {
        message: 'v-once',
        content: `<span style="color: red;">v-html</span>`,
        name: 'yj',
        age: 22,
        imgSrc: 'src/assets/logo.svg',
        isActive: false,
        visible: true,
        list: ['1', '2', '3','4'],
        inputMessage: 'hello world',
        isAgreee: false,
        hobbies: [],
        postition: 'left'
      }
    },
    methods: {
      handleChange: function() {
        this.message = 'not once'
      },
      handleChangeInfo: function() {
        this.age += 1;
        // this.name += 'yj'
      },
      handleActive: function() {
        this.isActive = !this.isActive
      },
      handleClick: function() {
        alert('v-on 事件绑定')
      },
      handleIf: function() {
        this.visible = !this.visible
      },
      handlePostition: function(p) {
        this.postition = p
      }
    },
    components: {
      SlotNav,
      ScopeSlot
    }
  }
</script>
<style>
  .active {
    color: red;
  }
</style>