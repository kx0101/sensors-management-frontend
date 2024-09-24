<template>
    <div class="block text-center p-4">
        <span class="font-medium text-xl font-semibold">KEX <span class="text-primary">SENSORS</span></span>
    </div>
    <div class="block text-center">
        <span class="font-medium text-xl font-semibold">Είσοδος Χρήστη</span>
    </div>
    <div class="flex flex-wrap justify-content-center p-4">
        <Card style="width: 20rem;">
            <template #content>
                <div>
                    <label for="username">Username</label>
                </div>
                <div class="mt-2">
                    <InputText id="username" v-model="username" :required="true" />
                </div>
                <div class="mt-3">
                    <label for="password">Password</label>
                </div>
                <Password class="mt-2" v-model="password" :required="true" :feedback="false" />
            </template>
            <template #footer>
                <div class=" flex justify-content-end">
                    <Button type="button" @click="login(username, password)" label="Sign In" class="mt-2" />
                </div>
            </template>
        </Card>
    </div>
    <Toast />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../usersStore';
import { useToast } from 'primevue/usetoast';

import { router } from '../Approutes'

const username = ref('')
const password = ref('')
const toast = useToast();

const auth = useAuthStore()
const { isLoggedIn } = auth;

onMounted(() => {
    const token = auth.initializeAuth();
    if (token) {
        router.push('/');
    }
});

const login = async (username: string, password: string) => {
    const response = await auth.login(username, password)

    if (response && response.error) {
        toast.add({ severity: 'error', detail: 'Λάθος όνομα ή κωδικός', life: 5000 })
        return
    }

    toast.add({ severity: 'success', detail: 'Συνδεθήκατε με επιτυχία', life: 5000 })
    await router.push('/');
}
</script>
