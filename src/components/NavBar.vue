<template>
    <Menubar :model="menuModel">
        <template #start>
            <span class="inline-flex align-items-center gap-2">
                <Image src='KEX_LOGO.png' width="35" height="40" alt="Kex logo" />
                <span class="font-medium text-xl font-semibold">KEX <span class="text-primary">SENSORS</span></span>
            </span>
        </template>
        <template #end>
            <Button @click="handleLogout" label="Εξοδος" icon="pi pi-sign-out" class="logout-button" severity="danger" />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { useAuthStore } from '../../usersStore';
import { router } from '../Approutes';

const auth = useAuthStore();

const navigate = async (route: string) => {
    await router.push(route);
};

const handleLogout = async () => {
    auth.logout();
    await router.push({ path: '/login' });
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
        ]
    },
    {
        label: 'Στατιστικά',
        icon: 'pi pi-chart-line',
        command: () => navigate('/sensorstats'),
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

.logout-button:hover {
    background-color: darkred;
}
</style>
