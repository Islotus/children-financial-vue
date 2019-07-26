import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/Login'
import Index from '@/views/home/Index'
import Register from '@/views/user/Register'
import Products from '@/views/financial/Products'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes : [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/',
    //   name: 'Home',
    //   redirect: '/table',//设置默认指向的路径
    //   component: Home,
    //   children:[
    //     {path:'table',component:JWTable,name:"Table",
    //     // children:[
    //     //   {path:'add',component:AddConsumer,name:"AddConsumer"}
    //     // ]
    //     },
    //     {path:'form',component:JWForm,name:"Form"},
    //     {path:'translate',component:JWTranslate,name:"Translate"},
    //     {
    //       path:'/message',
    //       name:'Message',
    //       component:Message
    //     },
    //     {
    //       path:'/setting',
    //       name:'Setting',
    //       component:Setting
    //     }
    //
    //   ]
    // },
    {
      path:'/login',
      name:'Login',
      component:Login
    }


  ]
})


