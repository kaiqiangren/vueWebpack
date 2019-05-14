import Vue from "vue";
import App from "./App.vue";

import { printMessage } from "./assets/util/util";
printMessage();
new Vue({
    render:h=>h(App)
}).$mount("#app")

