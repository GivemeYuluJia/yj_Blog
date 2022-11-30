import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

/**
 *  全局自定义指令
 *  -若指令较多 可以创建Directive文件进行操作
 *  */
app.directive("allFocus", {
  mounted(el, bindings) {
    console.log(bindings, "bindings");
    el?.focus();
  },
});

app.use(createPinia());
app.use(router);

app.mount("#app");
