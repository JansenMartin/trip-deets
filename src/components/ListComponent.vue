<template>
  <p>{{ weatherData }}</p>
</template>

<script>

export default {
  /* eslint-disable */
  props: ["weatherData"],
  created() {
    console.log('Component has been created!');
  },
  data(){
    return {
      //Return stuff here
    }
  },
  methods: {
    //List logic goes here
  },
}
</script>

<style>
</style>