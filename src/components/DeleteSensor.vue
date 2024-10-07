<template>
    <Button @click="reveal" label="Delete" severity="danger"></Button>

    <teleport to="body">
        <div v-if="isRevealed" class="modal-bg">
            <div class="modal">
                <h2>Confirmation</h2>
                <p>Η διαδικασία διαγραφής είναι μη αναστρέψιμη. Είστε σίγουροι;</p>
                <div class="button-group">
                    <Button label="Ναι" class="p-button-success" @click="handleConfirm" />
                    <Button label="Επιστροφή" class="p-button-danger" @click="cancel" />
                </div>
            </div>
        </div>
    </teleport>

    <Toast />
</template>

<script setup>
import { useConfirmDialog } from '@vueuse/core'
import { useToast } from 'primevue/usetoast';
import { useSensorsDataStore } from '../../store/sensorsDataStore';

const { isRevealed, reveal, cancel } = useConfirmDialog();
const toast = useToast();
const props = defineProps({ id: { type: String, required: true } });
const store = useSensorsDataStore();

const handleConfirm = () => {
    store.deleteSensor(props.id);
    toast.add({ severity: 'success', summary: 'Διαγραφή', detail: 'Ο αισθητήρας διαγράφεται', life: 3000 });
    cancel();
};
</script>

<style>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: #343a40;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
