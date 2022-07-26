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

export default createRouter({
    routes,
    history:createWebHistory()
})

