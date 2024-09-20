<template>
    <div>
        <h1>Sensors Data</h1>
        <button @click="initializeStore">Initialize Store</button>
        <div v-if="loading">Loading sensors...</div>
        <div v-if="error">{{ error }}</div>

        <ul v-if="sensors && sensors.length">
            <li v-for="sensor in sensors" :key="sensor._id">
                {{ sensor.name }} - Status: {{ sensor.status ? 'Active' : 'Inactive' }}
            </li>
        </ul>

        <div v-if="bell">
            <h2>Bell Status</h2>
            Status: {{ bell.status ? 'On' : 'Off' }}
            <button @click="toggleBell">Toggle Bell</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useSensorsDataStore } from '../store';

export default {
    setup() {
        const store = useSensorsDataStore();
        const loading = ref(false);
        const error = ref(null);

        const sensors = computed(() => store.sensors);
        const bell = computed(() => store.bell);

        const initializeStore = async () => {
            loading.value = true;
            try {
                await store.initStore();
            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        const toggleBell = async () => {
            if (!bell.value) {
                console.error("Bell is not initialized");
                return;
            }

            const previousStatus = bell.value.status;
            bell.value.status = !bell.value.status;

            const updatedBell = {
                _id: bell.value._id,
                status: !previousStatus,
            };

            try {
                await store.updateBell(updatedBell);
            } catch (err) {
                console.error("Failed to update bell, reverting to previous status", err);
                bell.value.status = previousStatus;
            }
        };

        onMounted(async () => {
            await initializeStore();
        });

        return {
            loading,
            error,
            sensors,
            bell,
            initializeStore,
            toggleBell,
        };
    },
};
</script>
