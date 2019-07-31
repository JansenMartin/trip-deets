
<template>
<!-- eslint-disable  -->
<div class="packing-list-container">
  <!-- <div v-if="listComplete"> -->
   <ul class="packing-list" v-for="item in list">
      <!-- <li>{{ item }}</li> -->
      <ItemComponent v-on:toggle-change=changeList($event)
      :item=item />
      <!-- :item=item.item -->
    </ul>
    <button v-if="userEmail" @click="saveList()" class="btn btn-primary save-list-btn">Save List</button>
    <!-- <OAuth v-on:log-in="loggedIn = true, currentUser = $event" -->
  </div>
</template>

<script>
import ItemComponent from "./ItemComponent";
// import SummaryComponent from "./SummaryComponent"

export default {
  /* eslint-disable */
  props: ["weatherData", "userEmail", "destination"],
  created() {
    this.generateList();
  },
  components: {
    ItemComponent,
  },
  data(){
    return {
      list: [],
      listComplete: false,
    }
  },
  methods: {
    generateList() {
        const jacket = {item: "1 jacket",  completed: false}
        const PJNum = Math.round(this.weatherData.length / 4)

        let pairs;
        if (PJNum > 1) {
          pairs = 'pairs of'
        }
        else {
          pairs = 'pair of'
        }

        const pajamas = {item: `${PJNum} ${pairs} pajamas`}

        this.list.push(jacket);
        this.list.push(pajamas);

        const items = {
            general: ["pairs of socks", "sets of underwear"],
            coldGeneral: ["coat", "warm hat", "pair of gloves/mittens", "sweater"],
            hotGeneral: ["summer hat", "bathing suit"],
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
        for (let i = 1; i < this.weatherData.length; i += 1) {
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
            let item = {item: `1 ${items.coldGeneral[i]}`, completed: false };
            this.list.push(item);
            // this.list.push(`1 ${items.coldGeneral[i]}`);
          }

          // Add items that increment based on number of days (shirts, etc.)
          for (let i = 0; i < items.cold.length; i += 1) {
            let item = {item: `${coldDays} ${items.cold[i]}`, completed: false }
            this.list.push(item);
            // this.list.push(`${coldDays} ${items.cold[i]}`);
          }
        }

        // If there are temperate days
        if (temperateDays > 0) {
          for (let i = 0; i < items.temperate.length; i += 1) {
            let item = {item: `${temperateDays} ${items.temperate[i]}`, completed: false }
            // Add items marked for temperate days
            this.list.push(item);
          }
        }

        //*******  TODO: Add shorts (based number of HOT days / 2)?  ******
        // If number of hot days is GREATER THAN 0...
        if (hotDays > 0) {
          // Add general 'one-off' items (like summer hat etc.)
          for (let i = 0; i < items.hotGeneral.length; i += 1) {
            let item = {item: `1 ${items.hotGeneral[i]}`, completed: false}
            this.list.push(item)
            // this.list.push(`1 ${items.hotGeneral[i]}`);
          }

          // Add items that increment based on number of days (tank-tops, etc.)
          for (let i = 0; i < items.hot.length; i += 1) {
            let item = {item: `${hotDays} ${items.hot[i]}`, completed: false};
            this.list.push(item)
            // this.list.push(`${hotDays} ${items.hot[i]}`);
          }
        }

        // If SNOW is true, add umbrella and snowboots
        if (snow) {
          for (let i = 0; i < items.snow.length; i += 1) {
            let item = {item: `1 ${items.snow[i]}`, completed: false }
            this.list.push(item)
            // this.list.push(`1 ${items.snow[i]}`);
          }
        }
        // If ONLY RAIN is true, add umbrella and raincoat
        else if (rain && !snow) {
          for (let i = 0; i < items.rain.length; i += 1) {
            let item = {item: `1 ${items.rain[i]}`, completed: false }
            this.list.push(item);
            // this.list.push(`1 ${items.rain[i]}`);
          }
        }

        // Add general daily items to the packing list (based on number of days)
        for (let i = 0; i < items.general.length; i += 1) {
          let item = {item: `${this.weatherData.length - 1} ${items.general[i]}`, completed: false }
          this.list.push(item);
            // this.list.push(`${this.weatherData.length} ${items.general[i]}`);
        }
        
      this.listComplete = true;
    },
    saveList() {
    this.list[0].destination = this.destination;
    
     const email = this.$props.userEmail
     this.axios.put(`http://localhost:3000/user?email=${email}`, {
            // list: [{item: "1 jacket", completed: false}]
            list: this.list
           })
           .then((response) => {
             console.log(response);
             this.alertDisplay();
           })
           .catch((error) => {
             console.log(error);
           })

  },
  changeList(event) {
    let i;
    for (i = 0; this.list[i].item != event.item; i += 1 ) {
    }
    
    this.list[i].completed = !this.list[i].completed
  },
   alertDisplay() {
        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal('Saved!', 'Successfully saved your list', 'success');
      }
  },
 
}
</script>

<style>

.packing-list li {
    padding-top: .5em;
}

.packing-list {
    margin-left: 3vw;
    margin-top: 1vw;
    display: inline-block;
    align-items: center;
}

.save-list-btn {
  margin-bottom: 3vw;
  margin-left: 6.3vw;
}

</style>