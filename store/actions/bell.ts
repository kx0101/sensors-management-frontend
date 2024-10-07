import { gqlClient, everything } from '../gqlClient';
import type { IBell } from '../../types';
import { ref, computed } from 'vue';

export const bell = ref<IBell>({
    _id: '',
    status: false,
});

export const getBell = computed(() => bell.value);

export async function fetchBell() {
    try {
        const bellData = await gqlClient.query({
            bell: { ...everything },
        });

        bell.value = bellData.bell || { _id: '', status: false } as IBell;
    } catch (err) {
        console.error(err);
    }
}

export async function updateBellStatus(bell_id: string, status: boolean) {
    try {
        await gqlClient.mutation({
            updateBell: {
                __args: {
                    bellInput: { _id: bell_id, status },
                },
                ...everything,
            }
        });

        bell.value.status = status;
        return status;
    } catch (err) {
        console.error(err);
    }
}

export async function testBell() {
    try {
        await fetch('http://localhost:3000/v1/bells/test-bell', { method: 'POST' });

        return 'Η σειρήνα βρίσκεται σε δοκιμή...';
    } catch (err) {
        console.log(err);
    }
}
