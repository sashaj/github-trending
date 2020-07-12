import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/styles.scss";
import VuePreloaders from "vue-preloaders";

Vue.config.productionTip = false;
Vue.use(VuePreloaders /*{ options }*/);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
