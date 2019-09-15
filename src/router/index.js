import NotFound from "@/components/notFound";

import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login/Login";
import Home from "@/components/home/index"

Vue.use(Router);

import 'vue-awesome/icons'
import signUp from "@/components/login/signUp";

export const routes = [
    {
        path: '/login',
        component: Login,
        name:"Login",
        meta: {layout: 'no-navbar'}
    },
    {
        path: '/',
        component: Home,
        name: 'Login',
        // eslint-disable-next-line no-unused-vars
        redirect: to => {
            if (localStorage.username)
                return '/home'
            else
                return '/login'
        }
    },
    {
        path: '/home',
        name: "home",
        component: Home,
    },
    {
        path: '/signup',
        component: signUp,
        name:"SignUp",
        meta: {layout: 'no-navbar'}
    },
    {
        path: '/brand',
        name: "Brand",
        component: () => import ("@/components/brand/index"),
    },
    {
        path: '/404',
        name: 'NOT FOUND',
        component: NotFound,
        meta: {layout: 'no-navbar'}
    },
    {
        path: '/metrics',
        name: 'Metrics',
        component: () => import ("@/components/metrics/index"),
    },
    {
        path: '/street',
        name: ' Street Info',
        component: () => import ("@/components/street/index"),
    },
    {
        path: '/store',
        name: ' Store Info',
        component: () => import ("@/components/store/index"),
    },
    {
        path: '/item',
        name: ' Item Info',
        component: () => import ("@/components/item/index"),
    },
    {
        path: '/beats',
        name: ' Beats Info',
        component: () => import ("@/components/beats/index"),
        children:[

        ]
    },
    {
        path: '/beats/:shopId',
        name: 'shopReport',
        component: () => import('@/components/beats/billing'),
        props: (route) => ({
            shop:{...route.params}
        })
    },
    {
        path: '/order',
        name: 'Customer Order',
        component: () => import('@/components/saleOrder/index'),
        props: (route) => ({
            shop:{...route.params}
        })
    },
    {
        path: '*',
        name: 'not found',
        component: NotFound,
        meta: {layout: 'no-navbar'}
    },
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: routes
})