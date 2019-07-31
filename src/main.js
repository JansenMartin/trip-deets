import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSession from 'vue-session'
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueRouter);
Vue.use(VueSession)
Vue.use(VueSweetalert2);

import VueAxios from 'vue-axios';
import axios from 'axios';

require('dotenv').config();
/* eslint-disable */

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

import HomeComponent from './components/HomeComponent.vue';
import SavedListComponent from "./components/SavedListComponent";
//Other component routes will go here

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeComponent
  },
  {
    name: 'lists',
    path: '/lists',
    component: SavedListComponent
   },
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
