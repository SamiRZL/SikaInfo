import { createApp } from 'vue'
import './assets/colors.css';
import App from './App.vue';
import router from './router/index'; // Import the router configuration
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import i18n from './i18n'



library.add(far, fas, fab);
const pinia = createPinia();


const app = createApp(App).use(i18n)

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

// Use the router configuration
app.use(router);

// Global mixin to persist selected locale
app.mixin({
    beforeUpdate() {
        // Save the current locale to localStorage
        localStorage.setItem('selectedLocale', this.$i18n.locale);
    },
});

// Mount the app to the '#app' element
app.mount('#app');
