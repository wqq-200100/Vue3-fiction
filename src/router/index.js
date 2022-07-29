import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'home',
        component:()=> import('../views/Home.vue'),
    },
    {
        path:'/detail',
        name:'detail',
        component:()=> import('../views/Detail.vue'),
    },
    {
        path:'/login',
        name:'login',
        component:()=> import('../views/Login.vue'),
    }
]
const router = createRouter({
    routes,
    history:createWebHistory()
})

// 路由守卫
router.beforeEach((to, from, next)=>{
    if (to === 'home'){
        window.localStorage.getItem('username') || router.push('/login')
    }
    next()
})

export default router

