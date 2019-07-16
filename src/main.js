import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

require('dotenv').config();
/* eslint-disable */
// console.log("The env key should be here:");
// console.log(process.env.VUE_APP_SECRET);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

import HomeComponent from './components/HomeComponent.vue';
//Other component routes will go here

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
