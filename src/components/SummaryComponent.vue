<template>
<!-- eslint-disable  -->
<div>
<div class="summary">
 
  <img v-if="sunny" class="icon" src='../assets/sunny.png'>
  <img v-if="cloudy" class="icon" src='../assets/cloudy.png'>
  <img v-if="rain" class="icon" src='../assets/rain.png'>
  <img v-if="snow" class="icon" src='../assets/snow.png'>
  <ul class="summary-list" v-for="item in summary">
      <li>{{ item }}</li>
    </ul>
</div>
</div>
</template>

<script>
/* eslint-disable */

export default {
  props: ["weatherData"],
  created() {
      this.buildSummary();
  },
  data() {
    return {
      summary: [],
      sunny: false,
      snow: false,
      rain: false
    }
  },
  methods: {
    buildSummary() {
    
      let rain = false;
      let snow = false;
      let hottestTemp = this.weatherData[0].high;

      for (let i = 0; i < this.weatherData.length; i += 1) {
          const weather = this.weatherData[i];

          if (weather.icon === "rain") {
              rain = true;
          }
          else if (weather.icon === "snow" || weather.icon === "sleet") {
              snow = true;
          }
          
          if (weather.high > hottestTemp) {
              hottestTemp = weather.high
          }
        }

      
      if (rain && snow) {
        this.summary.push("Expect rain and snow during your stay. ");
        this.snow = true;
      }
      else if (rain && !snow) {
        this.summary.push("Expect rain during your stay.  ");
        this.rain = true;
      }
      else if (!rain && snow) {
        this.summary.push("Expect snow during your stay.  ");
        this.snow = true;
      }
      else {
        this.summary.push("Well, hey!  Looks pretty clear!  ");
        this.sunny = true;
      }

      this.summary.push(`Your warmest day will be ${hottestTemp}° F.`);  
      this.summary.push(`We recommend taking these things with you: `);
    }
  }
}

</script>

<style>
.summary {
  padding-top: 1.5vw;
  padding-left: 3vw;  
}

.summary-list {
  list-style-type: circle;
}

img.icon {
  margin-left: 8vw;
  margin-bottom: 2vw;

  max-height: 50%;
  max-width: auto;
}
</style>