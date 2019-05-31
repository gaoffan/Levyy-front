import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/detail/:hid',
            name: 'detail',
            props: true,
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/Detail.vue')
        },
        {
            path: '/newhomework',
            name: 'newhomework',
            component: () => import('./views/NewHomework.vue')
        },
        {
            path: '/signin',
            name: 'signin',
            component: () => import('./views/SignIn.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('./views/SignUp.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/Admin.vue')
        }
    ]
})
