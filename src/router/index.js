import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
Vue.use(Router)

const routes = [];

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/mine',
            children:[
                {
                    path: '/static',
                    name: 'static',
                    component: () => import('../views/saleStatic.vue')
                }
            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: () => import('../views/mine.vue'),
        },
        {
            path: '/table',
            name: 'table',
            component: () => import('../views/table.vue')
        }
    ]
})
export default router;

router.beforeEach((to,from,next)=>{
    if(to.path == '/table'){
        next();
    }
    next();
})