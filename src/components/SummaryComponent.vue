<template>
<p>{{  summary }}</p>
</template>

<script>
/* eslint-disable */

export default {
  props: ["weatherData"],
  created() {
      this.buildSummary();
  },
  data() {
    // Stuff goes here
    return {
      summary: "It's a summary!"
    }
  },
  methods: {
    buildSummary() {
      this.summary = `Built a summary!  Got some props: ${this.weatherData[0].icon}`;
    }
  }
}

</script>

<style>
</style>