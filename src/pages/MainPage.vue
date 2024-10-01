<template>
    <div>
        <div v-for="building in uniqueBuildings" :key="building" class="building-section">
            <h3>{{ building }}</h3>
            <div class="card-container" v-if="sensorsByBuilding[building]">
                <div v-for="sensor in sensorsByBuilding[building]" :key="sensor._id" class="card-item">
                    <SensorView :sensor="sensor" :entry="getEntryForSensor(sensor.address, sensor.sensor_id)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { useSensorsDataStore } from '../../store';
import { wsManager } from '../../wsManager';
import type { IEntry } from '../../types';
import SensorView from '../components/SensorView.vue';
import { router } from '../Approutes'
import { useAuthStore } from '../../usersStore';

const auth = useAuthStore()
const store = useSensorsDataStore();

const uniqueBuildings = computed(() => store.getUniqueBuildings);

const sensorsByBuilding = ref({});
const currentEntry = ref<IEntry | null>(null);

onMounted(async () => {
    const token = auth.initializeAuth();
    if (!token) {
        router.push('/login');
    }

    await store.getSensorUniqueBuildings();
    wsManager.subscribe(handleNewEntry);
});

onBeforeUnmount(() => {
    wsManager.unsubscribe();
});

watch(uniqueBuildings, async (newUniqueBuildings) => {
    for (const building of newUniqueBuildings) {
        const sensors = await store.getSensorsByBuilding(building);

        if (sensors.length > 0) {
            sensorsByBuilding.value[building] = sensors;
        } else {
            console.warn(`No sensors found for ${building}`);
        }
    }
}, { deep: true });

function handleNewEntry(newEntry: IEntry) {
    currentEntry.value = newEntry;
}

function getEntryForSensor(sensorAddress: string, sensorId: number) {
    if (!currentEntry.value) {
        return
    }

    if (currentEntry.value.address !== sensorAddress || currentEntry.value.sensor !== sensorId) {
        return
    }

    return currentEntry.value;
}
</script>

<style>
.building-section {
    margin-bottom: 2rem;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

}

.card-item {
    flex: 1 1 25%;
    min-width: 200px;
}

@media (max-width: 768px) {
    .card-item {
        flex: 1 1 100%;
    }
}

.sensor-card {
    margin: 0;
    transition: transform 0.2s;
}

.sensor-card:hover {
    transform: scale(1.02);
}
</style>
