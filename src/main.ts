import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);

app.mount('#app');
