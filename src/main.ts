import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './styles/style.css';
import { i18n } from '@/plugins/i18n';
import { useAuthStore } from '@/stores/auth';

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
const authStore = useAuthStore();
authStore.initializeAuth();

router.isReady().then(() => {
  app.mount('#app');
});
