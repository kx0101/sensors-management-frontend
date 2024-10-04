import { createWebHistory, createRouter } from 'vue-router'

import Sensors from './pages/Sensors.vue'
import Login from './pages/Login.vue'
import MainPage from './pages/MainPage.vue'
import Alarms from './pages/Alarms.vue'
import Stats from './pages/Stats.vue'

const routes = [
    { path: '/alarms', component: Alarms },
    { path: '/sensors', component: Sensors },
    { path: '/stats', component: Stats },
    { path: '/login', component: Login },
    { path: '/', component: MainPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
