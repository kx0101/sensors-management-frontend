<template>
    <div class="flex flex-row flex-wrap gap-4 mt-4">
        <div v-for="sensor in sensors" :key="sensor._id">
            <SensorConfig :sensor="sensor" class="flex align-items-left justify-content-center" />
        </div>
        <CreateSensor />
    </div>
</template>

<script setup lang="ts">
import SensorConfig from '../components/SensorConfig.vue';
import CreateSensor from '../components/CreateSensor.vue';
import { computed, onMounted, ref } from 'vue';
import { useSensorsDataStore } from '../../store';
import { useAuthStore } from '../../usersStore';
import { router } from '../AppRoutes';

const store = useSensorsDataStore();
const auth = useAuthStore();
const loading = ref(false);
const error = ref(null);

const sensors = computed(() => store.sensors);
const bell = computed(() => store.bell);

onMounted(() => {
    const token = auth.initializeAuth();
    if (!token) {
        router.push('/login');
    }
});

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
</script>
