import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { router } from './AppRoutes'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Login from './pages/Login.vue';
import Sensors from './pages/Sensors.vue';
import NavBar from './components/NavBar.vue';
import Password from 'primevue/password';
import Image from 'primevue/image';
import { definePreset } from '@primevue/themes';
import Knob from 'primevue/knob';
import ProgressSpinner from 'primevue/progressspinner';
import 'material-icons/iconfont/material-icons.css';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import Column from 'primevue/column';

const app = createApp(App);
const pinia = createPinia();

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
    }
});

app.use(pinia);
app.use(ToastService);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset
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
app.component('Password', Password);
app.component('Login', Login);
app.component('Sensors', Sensors);
app.component('NavBar', NavBar);
app.component('Image', Image);
app.component('Knob', Knob);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Checkbox', Checkbox);
app.component('DataTable', DataTable);
app.component('Tag', Tag);
app.component('Column', Column);

app.mount('#app');
