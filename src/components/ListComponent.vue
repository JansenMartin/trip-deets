<template>
  <p>{{ list }}</p>
</template>

<script>

export default {
  /* eslint-disable */
  props: ["weatherData"],
  created() {
      this.generateList();
  },
  data(){
    return {
      list: "Clothes!"
    }
  },
  methods: {
    generateList() {
        this.list = "More clothes!"
    }
  },
}
</script>

<style>
</style>