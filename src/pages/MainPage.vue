<template>
    <div>

        <div class="checkbox-row">
            <div v-for="building of uniqueBuildings" :key="building" class="checkbox-item">
                <Checkbox v-model="selectedBuildings" :inputId="building" name="building" :value="building" />
                <label :for="building">{{ building }}</label>
            </div>
        </div>

        <div v-for="building in selectedBuildings" :key="building" :class="{ 'building-section': building }">
            <h3 class="building-title">{{ building }}</h3>
            <div class="card-container" v-if="sensorsByBuilding[building]">
                <div v-for="sensor in sensorsByBuilding[building]" :key="sensor._id" class="card-item">
                    <SensorView :timeout="isTimeout(sensor._id)" :sensor="sensor"
                        :entry="getEntryForSensor(sensor.address, sensor.sensor_id)" />

                    <template>
                        <Dialog v-for="dialog in dialogs" :key="dialog.id" v-model:visible="dialog.visible"
                            class="flex flex-col space-y-4" header="Πληροφορίες Συναγερμού" :closable="false"
                            :modal="true" width="500px">
                            <div class="p-4">
                                <div class="flex flex-row items-start space-x-2 mb-4">
                                    <i class="pi pi-building text-2xl text-green-500 mr-2"></i>

                                    <div class="flex flex-col">
                                        <p class="m-0"><strong>Κτίριο:</strong>
                                            {{ dialog.sensorBuilding }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-row items-start space-x-2 mb-4">
                                    <i class="pi pi-microchip text-2xl text-primary mr-2"></i>
                                    <div class="flex flex-col">
                                        <p class="m-0"><strong>Αισθητήρας:</strong> {{ sensor.name }}</p>
                                    </div>
                                </div>

                                <div class="flex flex-row items-start space-x-2 mb-4">
                                    <i class="pi pi-bell text-2xl text-red-500 mr-2"></i>

                                    <div class="flex flex-col">
                                        <p class="m-0"><strong>Αιτία:</strong>
                                            {{ dialog.reason }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <template #footer>
                                <div class="flex justify-end">
                                    <Button label="Απενεργοποίηση" icon="pi pi-check" class="p-button-success mr-2"
                                        @click="aknowledgeAlert(dialog.id)" />
                                </div>
                            </template>
                        </Dialog>
                    </template>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { useSensorsDataStore } from '../../store';
import { wsManager, entryCreatedQuery, alarmCreatedQuery, timeoutCreatedQuery } from '../../wsManager';
import type { IAlarm, IEntry, ISensor } from '../../types';
import SensorView from '../components/SensorView.vue';
import { router } from '../Approutes'
import { useAuthStore } from '../../usersStore';

const auth = useAuthStore()
const store = useSensorsDataStore();

const uniqueBuildings = computed(() => store.getUniqueBuildings);

const sensorsByBuilding = ref({});
const currentEntry = ref<IEntry | null>(null);
const showAlarmDialog = ref<boolean>(false);
const timeoutSensors = ref<Map<string, Date>>(new Map());
const dialogs = ref([]);
const selectedBuildings = ref([]);

onMounted(async () => {
    const token = auth.initializeAuth();
    if (!token) {
        router.push('/login');
    }

    await store.getSensorUniqueBuildings();
    await fetchAlarms();
    wsManager.subscribe('entryCreated', entryCreatedQuery, handleNewEntry);
    wsManager.subscribe('alarmCreated', alarmCreatedQuery, handleNewAlarm);
    wsManager.subscribe('timeoutCreated', timeoutCreatedQuery, handleNewTimeout);
});

onBeforeUnmount(() => {
    wsManager.unsubscribe('entryCreated');
    wsManager.unsubscribe('alarmCreated');
    wsManager.unsubscribe('timeoutCreated');
});

function toggleDialog(dialogId: string) {
    const dialog = dialogs.value.find(dialog => dialog.id === dialogId);

    if (dialog) {
        dialog.visible = !dialog.visible;
    }
}

async function aknowledgeAlert(dialogId: string) {
    await store.updateAlarm(dialogId, true);
    toggleDialog(dialogId);
}

async function fetchAlarms() {
    try {
        const alarms = await store.getAlarmsByAknowledged(false);
        if (!alarms.length) {
            console.log('No alarms found');
            return;
        }

        const requests = new Map();
        alarms.forEach(alarm => {
            const cacheKey = `${alarm.address}-${alarm.sensor}`;
            requests.set(cacheKey, alarm);
        });

        const uniqueRequests = Array.from(requests.values());

        const sensors = await store.getSensorsByBatch(uniqueRequests.map(alarm => ({
            address: alarm.address,
            sensor_id: alarm.sensor
        })));

        const dialogsData = uniqueRequests.map(alarm => {
            const sensorByAlarm = sensors.find(sensor => sensor.address === alarm.address && sensor.sensor_id === alarm.sensor);
            return {
                id: alarm._id,
                sensor_id: sensorByAlarm._id,
                sensorBuilding: sensorByAlarm ? sensorByAlarm.building : 'Unknown',
                sensorLocation: sensorByAlarm ? sensorByAlarm.location : 'Unknown',
                description: sensorByAlarm ? sensorByAlarm.description : 'Unknown',
                reason: alarm.reason,
                createdAt: alarm.createdAt,
            };
        });

        dialogs.value = dialogsData.filter(data => data);

        dialogs.value.forEach((dialog) => {
            toggleDialog(dialog.id)
        })
    } catch (error) {
        console.error('Failed to fetch alarms:', error);
    }
}

watch(uniqueBuildings, async (newUniqueBuildings) => {
    for (const building of newUniqueBuildings) {
        selectedBuildings.value.push(building);
        const sensors = await store.getSensorsByBuilding(building);

        if (sensors.length > 0) {
            sensorsByBuilding.value[building] = sensors;
        } else {
            console.warn(`No sensors found for ${building}`);
        }
    }
}, { deep: true });

function handleNewEntry(newEntry: IEntry) {
    if (!newEntry) {
        return
    }

    currentEntry.value = newEntry;
}

async function handleNewAlarm(newAlarm: IAlarm) {
    if (!newAlarm) {
        return;
    }

    const sensor: ISensor | null = await store.getSensorByAddressAndId(newAlarm.address, newAlarm.sensor);

    if (!sensor) {
        console.warn('Sensor for new alarm not found');
        return;
    }

    const newDialog = {
        id: newAlarm._id,
        visible: true,
        sensor_id: sensor._id,
        sensorBuilding: sensor.building || 'Unknown',
        sensorLocation: sensor.location || 'Unknown',
        description: sensor.description || 'Unknown',
        reason: newAlarm.reason,
        createdAt: newAlarm.createdAt,
    };

    dialogs.value.push(newDialog);
}

async function handleNewTimeout(timeout: { sensor_id: string, timeout: Date }) {
    timeoutSensors.value.set(timeout.sensor_id, timeout.timeout);
}

function isTimeout(sensor_id: string) {
    const timeout = timeoutSensors.value.get(sensor_id);

    if (!timeout) {
        return true;
    }

    const currentTime = Date.now();
    const timeoutTime = new Date(timeout).getTime();
    const fifteenMinutesInMs = 15 * 60 * 1000;

    return currentTime - timeoutTime >= fifteenMinutesInMs;
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
    max-width: 400px;
    min-height: 300px;
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

.building-title {
    font-size: 2rem;
    font-weight: bold;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
    color: #333;
    background-color: #f0f0f0;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
}

.checkbox-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.checkbox-item label {
    cursor: pointer;
    font-weight: 500;
}

.checkbox-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
}
</style>
