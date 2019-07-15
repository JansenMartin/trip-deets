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
      list: ["1 jacket"]
    }
  },
  methods: {
    generateList() {
        const items = {
            general: ["pairs of socks", "sets of underwear"],
            coldGeneral: ["coat", "warm hat", "pair of gloves/mittens", "sweater"],
            hotGeneral: ["summer hat"],
            cold: ["long-sleeved shirts"],
            temperate: ["t-shirts"],
            hot: ["tank tops", "shorts"],
            snowy: ["umbrella", "boots"],
            rainy: ["raincoat", "umbrella"],
        }

        // Add general daily items to the packing list (based on number of days)
        for (let i = 0; i < items.general.length; i += 1) {
            this.list.push(`${this.weatherData.length} ${items.general[i]}`);
        }

        // Add other misc items (like a jacket)

        let coldDays = 0;
        let hotDays = 0;
        let temperateDays = 0;
        
        let rain = false;
        let snow = false;

        // Iterate over the weather data, increment number of days based on HIGH
        for (let i = 0; i < this.weatherData.length; i += 1) {
          const weather = this.weatherData[i];

          if (weather.icon === "rain") {
              rain = true;
          }
          else if (weather.icon === "snow" || weather.icon === "sleet") {
              snow = true;
          }
          
          if (weather.high > 80) {
              hotDays += 1;
          }
          else if (weather.high < 50) {
              coldDays += 1;
          }
          else {
              temperateDays += 1;
          }
        }

        // console.log(`Number of hot days: ${hotDays}`);
        // console.log(`Number of cold days: ${coldDays}`);
        // console.log(`Number of temperate days: ${temperateDays}`);

        // Check rainy TRUE if rainy day appears
        // Check snowy TRUE if snowy day appears

        // If number of cold days is GREATER THAN 0...
        if (coldDays > 0) {
          
          // Add general 'one-off' items (like warm hat, coat, etc.)
          for (let i = 0; i < items.coldGeneral.length; i += 1) {
            this.list.push(`1 ${items.coldGeneral[i]}`);
          }

          // Add items that increment based on number of days (shirts, etc.)
          for (let i = 0; i < items.cold.length; i += 1) {
            this.list.push(`${coldDays} ${items.cold[i]}`);
          }

        }
            // Add hat, heavy coat, gloves/mittens to the list
            // Add long-sleeved shirts (based on the number of COLD days)

        // If number of hot days is GREATER THAN 0...
            // Add summer hat and sandals to the list
            // Add t-shirts (based on number of days)
            // Add shorts (based number of HOT days / 2)

        // If rainy AND snowy are TRUE (OR) snowy ONLY is true
            // Add umbrella and snowboots
        // else (only rainy is true)
            // Add umbrella and raincoat
        
    }
  },
}
</script>

<style>
</style>