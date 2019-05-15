import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import { printMessage } from "@/assets/util/util";

new Vue({
    router,
    render:h=>h(App)
}).$mount("#app")

