import { createWebHistory, createRouter } from 'vue-router'

import Sensors from './pages/Sensors.vue'
import Login from './pages/Login.vue'
import MainPage from './pages/MainPage.vue'

const routes = [
    { path: '/sensors', component: Sensors },
    { path: '/login', component: Login },
    { path: '/', component: MainPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
