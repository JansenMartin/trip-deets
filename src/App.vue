<template>
<div class="container">
   <header>
     <img id="banner" src="./assets/TripDeetsLogo.png">
     </header>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>

        <li class="nav-item">
          <!-- OAuth Component!! -->
          <OAuth v-on:log-in="loggedIn = true, currentUser = $event"
            v-on:log-out="loggedIn = false, currentUser = ''" provider="github" />
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link to="/lists" class="nav-link">Get Saved Lists</router-link>
        </li>
      </ul>
    </nav><br />
    <p v-if="loggedIn" class="greeting-container">Welcome, {{ currentUser.name }}!</p>
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

.greeting-container {
  background-color: #d3ffec;
  padding: 1vw;
  margin-top: -1.7vw;
  margin-bottom: 1vw;
  
}
</style>
