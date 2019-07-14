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
      list: []
    }
  },
  methods: {
    generateList() {
        const items = {
            general: ["pairs of socks", "sets of underwear"],
            cold: [],
            hot: [],
            snowy: [],
            rainy: []
        }

        this.list.push(`${this.weatherData.length} ${items.general[0]}`);
    }
  },
}
</script>

<style>
</style>