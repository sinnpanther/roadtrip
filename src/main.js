import './assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Aura from '@primeuix/themes/aura';
// import { definePreset } from '@primeuix/themes';
//
// const CustomPreset = definePreset(Aura, {
//     semantic: {
//         primary: {
//             50: '{indigo.50}',
//             100: '{indigo.100}',
//             200: '{indigo.200}',
//             // 300: '#A3B18A', /* hover*/
//             // 400: '#588157', /* base */
//             300: '{indigo.500}',
//             400: '{indigo.500}',
//             500: '{indigo.500}',
//             600: '{indigo.600}',
//             700: '{indigo.700}',
//             800: '{indigo.800}',
//             900: '{indigo.900}',
//             950: '{indigo.950}'
//         }
//     }
// });

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        // preset: CustomPreset,
    }
});
app.use(ConfirmationService);
app.mount("#app");

