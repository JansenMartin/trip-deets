<template>
<!-- eslint-disable  -->
<div>
  <ul v-for="item in summary">
      <li>{{ item }}</li>
    </ul>
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
    // Stuff goes here
    return {
      summary: []
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
            //   this.summary += "Expect rain.  ";
          }
          else if (weather.icon === "snow" || weather.icon === "sleet") {
              snow = true;
            //   this.summary += "Expect snowy weather.  ";
          }
          
          if (weather.high > hottestTemp) {
              hottestTemp = weather.high
            //   this.summary += ` The warmest day will be ${hottestTemp}F.  `
          }
        }

      if (rain && snow) {
        this.summary.push("Expect rain and snow during your stay. ");
      }
      else if (rain && !snow) {
        this.summary.push("Expect rain during your stay.  ");
      }
      else if (!rain && snow) {
        this.summary.push("Expect snow during your stay.  ");
      }
      else {
        this.summary.push("Well, hey!  Looks pretty clear!  ");
      }

      this.summary.push(`Your warmest day will be ${hottestTemp}F.`);  
      this.summary.push(`We recommend taking these things with you: `);
    }
  }
}

</script>

<style>
</style>