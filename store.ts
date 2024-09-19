import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        message: '',
    }),
    actions: {
        setMessage(newMessage) {
            this.message = newMessage;
        }
    },
});
