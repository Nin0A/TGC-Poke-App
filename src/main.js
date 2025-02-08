import { createApp } from 'vue';
import router from './router/router';
import App from './App.vue';
import { createPinia } from 'pinia';
import vHoverHighlight from './directives/hoverHighlight';

const app = createApp(App);

const pinia = createPinia();

// Utilise Pinia, la directive et le routeur
app.use(pinia);
app.use(router);
app.directive('hover-highlight', vHoverHighlight);

app.mount('#app');
