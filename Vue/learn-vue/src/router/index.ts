import { createRouter, createWebHistory } from "vue-router";

/**
 * 动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。
 *  用于权限管理, 也可以用路由导航守卫
 *
 * vue-router提供的导航守卫主要用来通过跳转或取消的方式守卫导航。
 * 全局的前置守卫beforeEach是在导航触发时会被回掉。
 * 有两个参数
 * - to 即将进入的路由Route对象
 * - from 即将离开的路由Route对象
 * 返回值
 * - false 取消当前导航
 * - 不返回或undefined 进行默认导航
 * - 返回一个路由地址 可以是string或是对象 对象包含path、query、params
 * 可选的第三个参数 next (vue2通过next函数来决定如何进行跳转 但在vue3中通过返回值来控制 不推荐next 因为开发中很容易掉用多次next)
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/optionapi",
      // 页面跳转可以指定name
      name: "optionapi",
      /** 路由懒加载 -> 通过import()实现分包
       *  可以把不同路由对应的组件分割成不同的代码块 当路由被访问时才加载对应的组件 这样会更加高效;提高首屏渲染
       *  */
      component: import("../views/OptionApi.vue"),
    },
    {
      path: "/compositionapi",
      name: "compositionapi",
      component: () => import("../views/CompositionApi.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/directive",
      name: "directive",
      component: () => import("../views/Directive.vue"),
    },
    {
      path: "/refs",
      name: "refs",
      component: () => import("../views/RefsView.vue"),
    },
    {
      path: "/keepalive",
      name: "keepalive",
      component: () => import("../views/KeepAliveView.vue"),
    },
  ],
});

export default router;
