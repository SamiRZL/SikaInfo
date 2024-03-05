// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import DocumentsPage from '../views/DocumentsPage.vue';
//import About from '../views/About.vue';

const routes = [
    { path: '/', component: LandingPage, props: route => ({ query: route.query.aspectId }), },
    { path: '/documents/:aspect/:category', component: DocumentsPage },
    // Add more routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
