import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import { printMessage } from "@/assets/util/util";
import image from "@/assets/img/沾福气.jpg";

const img = new Image();
img.src = image;
document.body.appendChild(img)
new Vue({
    router,
    render:h=>h(App)
}).$mount("#app")

