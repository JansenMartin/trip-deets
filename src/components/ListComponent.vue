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

        // General daily items
        for (let i = 0; i < items.general.length; i += 1) {
            this.list.push(`${this.weatherData.length} ${items.general[i]}`);
        }

        // this.list.push(`${this.weatherData.length} ${items.general[0]}`);
        // this.list.push(`${this.weatherData.length} ${items.general[1]}`);
    }
  },
}
</script>

<style>
</style>