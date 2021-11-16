
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import VueUi from '@/entry.esm';
import Dev from './serve.vue';
import router from './routes';

const app = createApp(Dev);
app.use(VueUi);
app.use(router);
app.mount('#app');
