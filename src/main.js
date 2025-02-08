import { createApp } from 'vue';
import router from './router/router';
import App from './App.vue';
import { createPinia } from 'pinia';
import vHoverHighlight from './directives/hoverHighlight';

// Crée une seule instance de l'application
const app = createApp(App);

// Crée une instance de Pinia
const pinia = createPinia();

// Utilise Pinia, la directive et le routeur
app.use(pinia);
app.use(router);
app.directive('hover-highlight', vHoverHighlight);

// Monte l'application
app.mount('#app');
