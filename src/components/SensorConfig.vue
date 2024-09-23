<template>
    <Card style="width: 25rem;">
        <template #title>
            {{ sensor.name }}
        </template>
        <template #subtitle>
            {{ sensor.description }}
        </template>
        <template #content>
            <p>Address: <span class="text-primary">{{ sensor.address }}</span></p>
            <p>Building: <span class="text-primary">{{ sensor.building }}</span></p>
            <p>Location: <span class="text-primary">{{ sensor.location }}</span></p>
            <p>Sensor ID: <span class="text-primary">{{ sensor.sensor_id }}</span></p>
            <p>Up limit: <span class="text-primary">{{ sensor.up_limit }} {{ sensor.unit }}</span></p>
            <p>Down limit: <span class="text-primary">{{ sensor.down_limit }} {{ sensor.unit }}</span></p>
            <p>Alarm: <span :class="sensor.status ? 'text-primary' : 'text-red-500'">{{ sensor.status ? 'On' : 'Off'
                    }}</span></p>
        </template>
        <template #footer>
            <div class="flex flex-row flex-wrap gap-1">
                <EditSensor :id="sensor._id" />
                <DeleteSensor :id="sensor._id" />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import EditSensor from './EditSensor.vue';
import DeleteSensor from './DeleteSensor.vue';
import type { ISensor } from '../../types';

defineProps<{ sensor: ISensor }>();

</script>
