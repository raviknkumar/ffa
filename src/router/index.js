import NotFound from "@/components/notFound";

import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/Login";
import Home from "@/components/home/index"

import VueBootstrap from 'bootstrap-vue'

Vue.use(Router);
Vue.use(VueBootstrap);

import 'vue-awesome/icons'
import signUp from "@/components/login/signUp";

export const routes = [
    {
        path: '/login',
        component: Login,
        meta: {layout: 'no-navbar',icon:"fa fa-sign-in"}
    },
    {
        path: '/home',
        name:"home",
        component: Home,
    },
    {path: '/signup', component: signUp},
    {
        path: '/404',
        name:'NOT FOUND',
        component: NotFound,
        meta: {layout: 'no-navbar'}
    },
    {
        path: '/metrics',
        name: 'Metrics',
        component: () => import ("@/components/metrics/index"),
    },
    {
        path: '/addStore',
        name: 'Add New Store',
        component: () => import ("@/components/addStore/index"),
    },
    {
        path: '*',
        name:'not found',
        component: NotFound,
        meta: {layout: 'no-navbar'}
    },
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: routes
})