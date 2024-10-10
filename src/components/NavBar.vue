<template>
    <Menubar :model="menuModel">
        <template #start>
            <span class="inline-flex align-items-center gap-2">
                <Image src='KEX_LOGO.png' width="35" height="40" alt="Kex logo" />
                <span class="font-medium text-xl font-semibold">KEX <span class="text-primary">SENSORS</span></span>
            </span>
        </template>
        <template #end>
            <Button v-if="status && (auth.isAdmin() || auth.isFacilityManager())" @click="showConfirmationDialog" label="Απενεργοποίηση Σειρήνας" icon="pi pi-lock"
                class="disable-button" severity="success" />
            <Button v-else-if="!status && (auth.isAdmin() || auth.isFacilityManager())" @click="handleEnableButton" label="Ενεργοποίηση Σειρήνας" icon="pi pi-lock-open"
                class="enable-button" severity="success" />
            <Button v-if="auth.isAdmin() || auth.isFacilityManager()" @click="handleTestButton" label="Δοκιμή Σειρήνας" icon="pi pi-bell" class="test-button"
                severity="info" />
            <Button @click="handleLogoutButton" label="Εξοδος" icon="pi pi-sign-out" class="logout-button"
                severity="danger" />
        </template>
    </Menubar>

    <Dialog header="Επιβεβαίωση" v-model:visible="confirmationVisible" modal>
        <p>Είστε σίγουροι ότι θέλετε να απενεργοποιήσετε τη σειρήνα;</p>
        <template #footer>
            <Button label="Ναι" icon="pi pi-check" @click="handleConfirmDisable" />
            <Button label="Όχι" icon="pi pi-times" @click="confirmationVisible = false" class="p-button-text" />
        </template>
    </Dialog>

    <Toast ref="toast" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useAuthStore } from '../../usersStore';
import { router } from '../Approutes';
import { useSensorsDataStore } from '../../store/sensorsDataStore';

const auth = useAuthStore();
const store = useSensorsDataStore();
const toast = useToast();
const status = computed(() => store.getBell.status);

const confirmationVisible = ref(false);

const navigate = async (route: string) => {
    await router.push(route);
};

const handleLogoutButton = async () => {
    auth.logout();
    await router.push({ path: '/login' });

    toast.add({
        severity: 'success',
        summary: 'Αποσύνδεση',
        detail: 'Έχετε αποσυνδεθεί με επιτυχία',
        life: 3000,
    });
};

const showConfirmationDialog = () => {
    confirmationVisible.value = true;
};

const handleConfirmDisable = async () => {
    confirmationVisible.value = false;
    await store.updateBellStatus(store.bell._id, false);

    toast.add({
        severity: 'warn',
        summary: 'Απενεργοποίηση Σειρήνας',
        detail: 'Η σειρήνα έχει απενεργοποιηθεί',
        life: 3000,
    });
};

const handleEnableButton = async () => {
    await store.updateBellStatus(store.bell._id, true);

    toast.add({
        severity: 'success',
        summary: 'Ενεργοποίηση Σειρήνας',
        detail: 'Η σειρήνα έχει ενεργοποιηθεί',
        life: 3000,
    });
};

const handleTestButton = async () => {
    try {
        const response = await store.testBell();
        toast.add({
            severity: 'success',
            summary: 'Δοκιμή',
            detail: response,
            life: 3000,
        });
    } catch (err) {
        console.error(err);
        toast.add({
            severity: 'error',
            summary: 'Σφάλμα',
            detail: err,
            life: 3000,
        });
    }
};

const menuModel = ref([
    {
        label: 'Ενδείξεις',
        icon: 'pi pi-wifi',
        command: () => navigate('/'),
    },
    {
        label: 'Ρυθμίσεις',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'Αισθητήρες',
                icon: 'pi pi-sensor',
                command: () => navigate('/sensors'),
            },
        ],
    },
    {
        label: 'Στατιστικά',
        icon: 'pi pi-chart-line',
        command: () => navigate('/stats'),
    },
    {
        label: 'Συναγερμοί',
        icon: 'pi pi-bell',
        command: () => navigate('/alarms'),
    },
]);
</script>

<style scoped>
.p-menuitem {
    text-decoration: none;
}

.p-menuitem i {
    margin-right: 0.5rem;
}

.p-menubar {
    display: flex;
    justify-content: space-between;
}

.logout-button {
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-left: auto;
}

.disable-button {
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-left: auto;
    margin-right: 1rem;
}

.test-button {
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-left: auto;
    margin-right: 1rem;
}

.enable-button {
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-left: auto;
    margin-right: 1rem;
}

.logout-button:hover {
    background-color: darkred;
}
</style>
