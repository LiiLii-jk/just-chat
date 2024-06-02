import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Home",
        component:() => import('../view/Home/index.vue')
    },{
        path:"/bot",
        name:"Bot",
        component:() => import('../view/BotMessage/index.vue')
    },{
        path:"/dialog",
        name:"Dialog",
        component:() => import('../view/Dialog/index.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router