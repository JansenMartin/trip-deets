<template>
<div class="container">
  <!-- <p><OAuth provider="github" /></p> -->
   <header>
     <h1>Trip Deets</h1>
     </header>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>

        <li class="nav-item">
          <!-- OAuth Component!! -->
          <OAuth provider="github" />
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a href="">I can render!</a>
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <ListComponent weatherData="hello" /> -->
  </div>
</template>

<script>
/* eslint-disable */
import OAuth from "./components/OAuth";
// import ListComponent from "./components/ListComponent";
// import HomeComponent from './components/HomeComponent.vue'

export default {
  name: 'app',
  data: {
    loggedIn: false
  },
  components: {
    OAuth
    // ListComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
