<template>
<p>{{  summary }}</p>
</template>

<script>
/* eslint-disable */

export default {
  props: ["weatherData"],
  data() {
    // Stuff goes here
    return {
      summary: "It's a summary!"
    }
  }
}

</script>

<style>
</style>