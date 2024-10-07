<template>
    <div>
        <Button icon="pi pi-plus" rounded @click="visibleCard = !visibleCard" />
        <div class="card flex justify-content-center">
            <Dialog v-model:visible="visibleCard" modal header="Εισαγωγή νέου αισθητήρα" :style="{ width: '25rem' }">
                <span class="p-text-secondary block mb-5">Εισάγωγή τιμών στα πεδία.</span>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="name" class="font-semibold w-6rem">Name</label>
                    <InputText id="name" v-model="sensor.name" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="description" class="font-semibold w-6rem">Description</label>
                    <InputText id="description" v-model="sensor.description" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="address" class="font-semibold w-6rem">Address</label>
                    <InputText id="address" v-model="sensor.address" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="location" class="font-semibold w-6rem">Location</label>
                    <InputText id="location" v-model="sensor.location" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="type" class="font-semibold w-6rem">Type</label>
                    <InputText id="type" v-model="sensor.type" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="sensor_id" class="font-semibold w-6rem">Sensor ID</label>
                    <InputNumber id="sensor_id" v-model="sensor.sensor_id" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="unit" class="font-semibold w-6rem">Unit</label>
                    <InputText id="unit" v-model="sensor.unit" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="building" class="font-semibold w-6rem">Building</label>
                    <InputText id="building" v-model="sensor.building" class="flex-auto" autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-2">
                    <label for="up_limit" class="font-semibold w-6rem">Up limit</label>
                    <InputNumber id="up_limit" v-model="sensor.up_limit" :min-fraction-digits="1" class="flex-auto"
                        autocomplete="off" />
                </div>

                <div class="flex align-items-center gap-3 mb-5">
                    <label for="down_limit" class="font-semibold w-6rem">Down limit</label>
                    <InputNumber id="down_limit" v-model="sensor.down_limit" :min-fraction-digits="1" class="flex-auto"
                        autocomplete="off" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visibleCard = false"></Button>
                    <Button type="button" label="Save" @click="save()"></Button>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSensorsDataStore } from '../../store/sensorsDataStore';
import type { GraphQLError } from 'graphql';

const visibleCard = ref(false);
const store = useSensorsDataStore();

const sensor = ref({
    _id: '',
    name: '',
    description: '',
    address: '',
    location: '',
    type: '',
    sensor_id: 0,
    unit: '',
    status: false,
    building: '',
    up_limit: 0,
    down_limit: 0,
});

async function save() {
    try {
        await store.createSensor(sensor.value);
        visibleCard.value = false;
        resetSensor();
    } catch (err) {
        console.error('GraphQL Error:', err);
    }
}

function resetSensor() {
    sensor.value = {
        _id: '',
        name: '',
        description: '',
        address: '',
        location: '',
        type: '',
        sensor_id: 0,
        unit: '',
        status: false,
        building: '',
        up_limit: 0,
        down_limit: 0,
    };
}
</script>
