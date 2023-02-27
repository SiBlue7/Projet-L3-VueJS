import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import axios from "axios";
import VueAxios from "vue-axios";

import './assets/main.css'
import IndexComponent from "@/components/IndexComponent.vue";



const routes = [
    {path: '/', name:'homepage', component: IndexComponent},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router, VueAxios, axios)

app.mount('#app')