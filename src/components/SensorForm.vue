<template>
    <div>
        <div class="flex align-items-center gap-3 mb-2" v-for="field in fields" :key="field.id">
            <label :for="field.id" class="font-semibold w-6rem">{{ field.label }}</label>
            <component :is="field.component" :id="field.id" v-model="formValues[field.model]" class="flex-auto"
                autocomplete="off" v-bind="field.props" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, emit } from 'vue';

const props = defineProps({
    sensor: {
        type: Object,
        required: true,
    },
});

const fields = [
    { id: 'name', label: 'Name', model: 'name', component: 'InputText' },
    { id: 'description', label: 'Description', model: 'description', component: 'InputText' },
    { id: 'address', label: 'Address', model: 'address', component: 'InputText' },
    { id: 'location', label: 'Location', model: 'location', component: 'InputText' },
    { id: 'type', label: 'Type', model: 'type', component: 'InputText' },
    { id: 'sensor_id', label: 'Sensor ID', model: 'sensor_id', component: 'InputNumber' },
    { id: 'unit', label: 'Unit', model: 'unit', component: 'InputText' },
    { id: 'building', label: 'Building', model: 'building', component: 'InputText' },
    { id: 'up_limit', label: 'Up limit', model: 'up_limit', component: 'InputNumber', props: { 'min-fraction-digits': 1 } },
    { id: 'down_limit', label: 'Down limit', model: 'down_limit', component: 'InputNumber', props: { 'min-fraction-digits': 1 } },
];

const formValues = ref(props.sensor);

watch(
    () => props.sensor,
    (newSensor) => {
        formValues.value = newSensor;
    }
);

watch(formValues, (newValues) => {
    emit('update:sensor', newValues);
});
</script>
