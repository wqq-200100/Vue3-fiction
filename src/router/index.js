import {createRouter, createWebHistory} from "vue-router";
import {getLocal} from "../utils/tools";

const routes = [
    {
        path: '/',
        redirect:'home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/Detail.vue'),
    },
    {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/Collect.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    }
]
const router = createRouter({
    routes,
    history: createWebHistory()
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = !!getLocal('usernameData');
    console.log(isLogin)

    if (to.path === '/login') {
        next();
    } else {
        // 是否在登录状态下
        isLogin ? next() : next('/login');
    }
})

export default router

