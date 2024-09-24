import { createWebHistory, createRouter } from 'vue-router'

import Sensors from './pages/Sensors.vue'
import Login from './pages/Login.vue'

const routes = [
    { path: '/sensors', component: Sensors },
    { path: '/login', component: Login },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
