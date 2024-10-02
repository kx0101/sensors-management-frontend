<template>
    <Card :class="{ 'alarm-active': alarm }">
        <template #title>
            {{ props.sensor.name }}
        </template>
        <template #subtitle>
            <div class="grid grid-cols-5 items-center gap-3">
                <div class="column-span-2">
                    <p class="ml-2 mt-1">Ενδείξεις:</p>
                </div>
                <div class="column-span-1 flex justify-center">
                    <i class="pi pi-wifi mt-1 text-2xl" :class="!status ? '' : 'text-primary'"></i>
                </div>
                <div class="column-span-1 flex justify-center">
                    <i class="pi pi-cog mt-1 text-2xl" :class="!response ? '' : 'text-primary'"></i>
                </div>
                <div class="column-span-1 flex justify-center">
                    <i class="pi pi-exclamation-triangle mt-1 text-2xl" :class="!warning ? '' : 'text-yellow-500'"></i>
                </div>
                <div class="column-span-1 flex justify-center">
                    <i class="pi pi-bell mt-1 text-2xl" :class="alarm && 'text-red-500'"></i>
                </div>
            </div>
        </template>
        <template #content>
            <div class="card flex justify-content-left m-4" v-if="!visible">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" animationDuration=".5s" />
            </div>
            <div class="flex flex-row flex-wrap gap-2" v-if="visible">
                <h2 v-if="props.sensor.type === 'Gauge' && props.sensor.sensor_id === 4"
                    class="material-icons text-primary text-3xl">
                    thermostat
                </h2>
                <h2 v-if="props.sensor.type === 'Gauge' && props.sensor.sensor_id === 5"
                    class="material-icons text-primary text-3xl">
                    water_drop
                </h2>
                <h2 v-if="props.sensor.type === 'Digital'" class="material-icons text-primary text-3xl">flood</h2>
                <h2 v-if="props.sensor.type === 'Digital2'" class="material-icons text-primary text-3xl">offline_bolt
                </h2>

                <Knob readonly v-if="props.sensor.type === 'Gauge' && props.sensor.sensor_id === 5"
                    valueColor="var(--primary-color)" v-model="localEntryValue" :step="10" :size="80"
                    :valueTemplate="`${localEntryValue?.toFixed()}%`" />
                <Knob readonly v-if="props.sensor.type === 'Gauge' && props.sensor.sensor_id === 4"
                    valueColor="var(--primary-color)" v-model="localEntryValue" :step="10" :size="80"
                    :valueTemplate="`${localEntryValue?.toFixed()}°C`" />

                <Button class="m-2" v-if="props.sensor.type === 'Digital'" raised rounded
                    :icon="localEntryValue === 0 ? 'pi pi-check' : 'pi pi-times'"
                    :severity="localEntryValue === 0 ? 'success' : 'danger'" />
                <Button class="m-2" v-if="props.sensor.type === 'Digital2'" raised rounded
                    :icon="localEntryValue === 0 ? 'pi pi-check' : 'pi pi-times'"
                    :severity="localEntryValue === 0 ? 'success' : 'danger'" />
            </div>
        </template>
        <template #footer>
            <div v-if="props.sensor.type === 'Gauge'">
                <p class="text-sm text-white">
                    Ανώτατο όριο: <span class="text-primary">{{ props.sensor.up_limit }}</span>
                </p>
                <p class="text-sm text-white">
                    Κατώτερο όριο: <span class="text-primary">{{ props.sensor.down_limit }}</span>
                </p>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { defineProps } from 'vue';
import type { IEntry, ISensor } from '../../types';
import Button from 'primevue/button';
import { useSensorsDataStore } from '../../store';

const props = defineProps<{
    sensor: ISensor;
    entry: IEntry | null | undefined;
}>();

const store = useSensorsDataStore();

const localEntryValue = ref<number | null>(null);
const visible = ref<boolean>(false);
const response = ref<boolean>(false);
const status = ref<boolean>(false);
const warning = ref<boolean>(false);
const alarm = ref<boolean>(false);

watch(() => props.entry, (newEntry) => {
    if (newEntry) {
        alarm.value = newEntry.value > props.sensor.up_limit || newEntry.value < props.sensor.down_limit;
        localEntryValue.value = newEntry.value;
        visible.value = true;
        status.value = true;
    }
}, { immediate: true });
</script>

<style scoped>
.alarm-active {
    border: 1px solid #ff4d4d;
}

.text-2xl {
    font-size: 1.5rem;
}

.text-3xl {
    font-size: 2rem;
}
</style>
