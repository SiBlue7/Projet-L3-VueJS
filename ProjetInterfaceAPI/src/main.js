import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'
import PageAccueil from "@/components/PageAccueil.vue";
import PageManga from "@/components/PageManga.vue";



const routes = [
    {path: '/', name:'homepage', component: PageAccueil},
    {path: '/manga/:id', name:'PageManga', component: PageManga, props: true, param: true}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router, VueAxios, axios)

app.mount('#app')