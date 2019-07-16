
<template>
<!-- eslint-disable  -->
<div class="packing-list-container">
  <!-- <div v-if="listComplete"> -->
   <ul class="packing-list" v-for="item in list">
      <!-- <li>{{ item }}</li> -->
      <ItemComponent :item=item />
    </ul>
  </div>
 </div>
</template>

<script>
import ItemComponent from "./ItemComponent";

export default {
  /* eslint-disable */
  props: ["weatherData"],
  created() {
      this.generateList();
  },
  components: {
    ItemComponent
  },
  data(){
    return {
      list: [],
      listComplete: false
    }
  },
  methods: {
    generateList() {
        this.list.push("1 jacket");

        const items = {
            general: ["pairs of socks", "sets of underwear"],
            coldGeneral: ["coat", "warm hat", "pair of gloves/mittens", "sweater"],
            hotGeneral: ["summer hat"],
            cold: ["long-sleeved shirts"],
            temperate: ["t-shirts", "pairs of jeans"],
            hot: ["tank tops", "pairs of shorts"],
            snow: ["umbrella", "boots"],
            rain: ["raincoat", "umbrella"],
        }

        // // Add general daily items to the packing list (based on number of days)
        // for (let i = 0; i < items.general.length; i += 1) {
        //     this.list.push(`${this.weatherData.length} ${items.general[i]}`);
        // }


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

        // If there are temperate days
        if (temperateDays > 0) {
          for (let i = 0; i < items.temperate.length; i += 1) {
            // Add items marked for temperate days
            this.list.push(`${temperateDays} ${items.temperate[i]}`);
          }
        }

        //*******  TODO: Add shorts (based number of HOT days / 2)?  ******
        // If number of hot days is GREATER THAN 0...
        if (hotDays > 0) {
          // Add general 'one-off' items (like summer hat etc.)
          for (let i = 0; i < items.hotGeneral.length; i += 1) {
            this.list.push(`1 ${items.hotGeneral[i]}`);
          }

          // Add items that increment based on number of days (tank-tops, etc.)
          for (let i = 0; i < items.hot.length; i += 1) {
            this.list.push(`${hotDays} ${items.hot[i]}`);
          }
        }

        // If SNOW is true, add umbrella and snowboots
        if (snow) {
          for (let i = 0; i < items.snow.length; i += 1) {
            this.list.push(`1 ${items.snow[i]}`);
          }
        }
        // If ONLY RAIN is true, add umbrella and raincoat
        else if (rain && !snow) {
          for (let i = 0; i < items.rain.length; i += 1) {
            this.list.push(`1 ${items.rain[i]}`);
          }
        }

        // Add general daily items to the packing list (based on number of days)
        for (let i = 0; i < items.general.length; i += 1) {
            this.list.push(`${this.weatherData.length} ${items.general[i]}`);
        }
        
      this.listComplete = true;
    }
  },
}
</script>

<style>
/* .packing-list, form {
    border: solid black 1px;
} */

.packing-list li {
    padding-top: .5em;
    /* text-decoration: line-through; */
}

.line-through {
    /* Something here */
}
.packing-list {
    margin-left: 3vw;
    margin-top: 1vw;
    display: inline-block;
    align-items: center;
    /* max-width: 100px; */
}
</style>