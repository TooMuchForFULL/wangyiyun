import Vue from "vue"
import VueRouter from 'vue-router'
import Home from '../views/home.vue' 
import itemMusic from '../views/itemMusic.vue'
import search from '../views/search.vue' 
import login from '../views/login.vue' 
import userPage from '../views/userPage.vue' 

import store from '../store/index.js'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/',
            redirect:'/home',//默认显示
            beforeEnter:(to,from,next)=>{ store.state.isFooterMusic = true}
        },
        {
          path:'/itemMusic',
          component:itemMusic,
        },
        {
            path:'/search',
            component:search,
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/userPage',
            beforeEnter:(to,from,next)=>{   //进入前先进行判断，称路由守卫
                if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
                    next();
                }else{
                    next('/login');
                }
                
            },
            component:userPage
        },
    ],
    
})