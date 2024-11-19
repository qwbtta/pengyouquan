import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/newAdd',
    name: 'newAdd',
    component: () => import('../views/newAdd.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('../views/details.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/labelManage',
    name: 'labelManage',
    component: () => import('../views/labelManage.vue'),
    meta:{
      requiresAuth:true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
let token = localStorage.getItem("token")
  if (!token) {
    // 未登录，重定向到登录页
    to.path!=='/login' && to.matched.some(record => record.meta.requiresAuth) ?  next('/login'): next()

  } else {
    // 已登录，允许继续访问目标路由
    next();
  }
});

export default router
