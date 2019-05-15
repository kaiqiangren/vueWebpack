import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
const index = () => import('@/pages/index.vue');
const route = new VueRouter({
    mode: "history",
    routes:[
        {
            path: '/index',
            name: 'index',
            component: index
        }
    ]
})

export default route;