<template>
    <div>
        <NavBar v-if="isLoggedIn" />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { computed } from 'vue';
import { useSensorsDataStore } from '../store';
import { useAuthStore } from '../usersStore';

const sensorsStore = useSensorsDataStore();
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>
