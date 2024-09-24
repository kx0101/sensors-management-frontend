<template>
    <div>
        <router-view />
    </div>
</template>

<script setup lang="ts">
import { useSensorsDataStore } from '../store';
import { useAuthStore } from '../usersStore';

const store = useSensorsDataStore()
const { isLoggedIn } = useAuthStore()

</script>
