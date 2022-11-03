<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <!--router-link
          - to 是一个字符串 或是一个对象
          - replace 设置replace属性 当点击时 会调用router.replace而不是router.push
          - active-class 设置激活a元素后应用的class 默认为router-link-active
          - exact-active-class 链接精准激活 应用于渲染a的class 默认router-link-exact-active
        -->
        <RouterLink to="/optionapi">Option Api</RouterLink>
        <RouterLink to="/compositionapi">Composition Api</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/directive">Directive 指令</RouterLink>
        <RouterLink to="/refs">refs</RouterLink>
        <RouterLink to="/keepalive">keep-alive</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
