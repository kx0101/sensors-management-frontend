<template>
    <div>
        <NavBar v-if="isLoggedIn" />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { computed, onMounted, onBeforeMount } from 'vue';
import { useSensorsDataStore } from '../store/sensorsDataStore';
import { useAuthStore } from '../usersStore';

const sensorsStore = useSensorsDataStore();
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);

onBeforeMount(async () => {
    authStore.initializeAuth()

    await sensorsStore.initStore();
})
</script>
