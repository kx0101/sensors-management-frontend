<template>
    <Button label="Edit" @click="visible = true" />
    <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" modal header="Τροποποίηση αισθητήρα" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Εισάγωγή αλλαγών στα πεδία.</span>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="name" class="font-semibold w-6rem">Name</label>
                <InputText :disabled="!auth.isAdmin()" id="name" v-model="sensor.name" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="description" class="font-semibold w-6rem">Description</label>
                <InputText :disabled="!auth.isAdmin()" id="description" v-model="sensor.description" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="address" class="font-semibold w-6rem">Address</label>
                <InputText :disabled="!auth.isAdmin()" id="address" v-model="sensor.address" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="location" class="font-semibold w-6rem">Location</label>
                <InputText :disabled="!auth.isAdmin()" id="location" v-model="sensor.location" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="type" class="font-semibold w-6rem">Type</label>
                <InputText :disabled="!auth.isAdmin()" id="type" v-model="sensor.type" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="sensor_id" class="font-semibold w-6rem">Sensor ID</label>
                <InputNumber :disabled="!auth.isAdmin()" id="sensor_id" v-model="sensor.sensor_id" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="unit" class="font-semibold w-6rem">Unit</label>
                <InputText :disabled="!auth.isAdmin()" id="unit" v-model="sensor.unit" class="flex-auto"
                    autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-2">
                <label for="building" class="font-semibold w-6rem">Building</label>
                <InputText :disabled="!auth.isAdmin()" id="building" v-model="sensor.building" class="flex-auto"
                    autocomplete="off" />
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

            <div class="flex align-items-center gap-3 mb-5">
                <label for="down_limit" class="font-semibold w-6rem">Alarm</label>
                <ToggleSwitch v-model="sensor.status" />
            </div>

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save()"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import type { GraphQLError } from 'graphql';
import { useToast } from 'primevue/usetoast';
import type { ISensor } from '../../types';
import { computed, ref } from 'vue';
import { useSensorsDataStore } from '../../store/sensorsDataStore';
import { useAuthStore } from '../../usersStore';

const visible = ref(false);
const toast = useToast();
const auth = useAuthStore();
const store = useSensorsDataStore();

const props = defineProps({ id: { type: String, required: true } })
const sensors = computed(() => store.sensors);
const sensor = ref({} as ISensor);

const loadSensor = () => {
    const foundSensor = store.sensors.find((s) => s._id === props.id);
    if (foundSensor) {
        sensor.value = { ...foundSensor };
    }
};

loadSensor();

async function save() {
    const originalSensor = { ...sensor.value };

    try {
        const { data, success } = await store.updateSensor(sensor.value);

        if (!success) throw new Error('Update failed');

        const index = store.sensors.findIndex((s) => s._id === props.id);
        if (index !== -1) {
            store.sensors[index] = { ...data };
        }

        toast.add({ severity: 'success', summary: 'Επιτυχία', detail: 'Ο αισθητήρας ενημερώθηκε επιτυχώς!', life: 3000 });
    } catch (err) {
        console.error('Error:', err);
        toast.add({ severity: 'error', summary: 'Αποτυχία', detail: 'Η ενημέρωση του αισθητήρα απέτυχε.', life: 3000 });

        sensor.value = originalSensor;
    } finally {
        visible.value = false;
    }
}
</script>
