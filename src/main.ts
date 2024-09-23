import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('ToggleSwitch', ToggleSwitch);
app.component('Toast', Toast);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);

app.mount('#app');
