<script setup lang="ts">
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

</script>
