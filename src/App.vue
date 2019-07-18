<template>
<div class="container">
  <!-- <p><OAuth provider="github" /></p> -->
   <header>
     <!-- <h1>Trip Deets</h1> -->
     <img id="banner" src="https://bit.ly/2YYWWYn">
     </header>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>

        <li class="nav-item">
          <!-- OAuth Component!! -->
          <OAuth v-on:log-in="loggedIn = true, currentUser = $event" provider="github" />
        </li>
        <!-- <li class="nav-item" v-if="loggedIn">
          <a href="">I can render!</a>
        </li> -->
      </ul>
    </nav><br />
    <p v-if="loggedIn">Welcome, {{ currentUser }}!</p>
    <transition name="fade">
      <router-view></router-view>
    </transition>
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
    loggedIn: false,
    currentUser: ""
  },
  components: {
    OAuth
    // ListComponent
  }
}
</script>

<style>

header {
  text-align: center;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
