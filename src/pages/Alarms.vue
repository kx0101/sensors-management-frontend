<template>
    <div class="card pt-2">
        <DataTable :value="alarmsList">
            <Column field="name" header="Όνομα"></Column>
            <Column field="building" header="Κτήριο"></Column>
            <Column field="location" header="Τοποθεσία"></Column>
            <Column header="Αιτιολογία">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.reason" />
                </template>
            </Column>
            <Column field="timestamp" header="Ημερομηνία">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.timestamp) }}
                </template>
            </Column>
        </DataTable>

        <div class="pagination-buttons">
            <Button label="Προηγούμενο" :disabled="page <= 0" @click="prevPage" />
            <Button label="Επόμενο" :disabled="!hasMore" @click="nextPage" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSensorsDataStore } from '../../store/sensorsDataStore';
import { IAlarm } from '../../types';

const store = useSensorsDataStore();

const alarmsList = ref<IAlarm[]>([]);

const page = ref(0);
const limit = 10;
const hasMore = ref(true);

const sensors = computed(() => store.sensors);

const fetchAlarms = async () => {
    const alarms = await store.getAlarms(limit, page.value * limit);

    alarmsList.value = [];

    alarms.forEach((alarm) => {
        const sensor = sensors.value.find(s => s.address === alarm.address && s.sensor_id === alarm.sensor);
        if (sensor) {
            alarmsList.value.push({
                name: sensor.name,
                building: sensor.building,
                location: sensor.location,
                reason: alarm.reason,
                timestamp: alarm.createdAt,
            });
        }
    });

    hasMore.value = alarms.length === limit;
};

const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('el-GR', {
        timeZone: 'Europe/Athens',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

const nextPage = async () => {
    page.value += 1;
    await fetchAlarms();
};

const prevPage = async () => {
    if (page.value > 0) {
        page.value -= 1;
        await fetchAlarms();
    }
};

onMounted(async () => {
    await fetchAlarms();
});
</script>

<style scoped>
.pagination-buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>
