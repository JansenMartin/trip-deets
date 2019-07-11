<template>
<div class="container">
  <!-- <p><OAuth provider="github" /></p> -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="" class="nav-link">Log In</router-link>
        </li> -->
        <li class="nav-item">
          <OAuth provider="github" />
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import OAuth from "./components/OAuth";
// import HomeComponent from './components/HomeComponent.vue'
// eslint-disable-next-line

export default {
  name: 'app',
  components: {
    OAuth
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
