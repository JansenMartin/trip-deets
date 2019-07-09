<template>
 <div>
     <p>Hello</p>
     <form @submit.prevent="getWeather">
         <label>Location:</label>
         <input type="text" class="form-control" v-model="query.location">
         <label>Date:</label>
         <input type="text" class="form-control" v-model="query.date">
         <div class="form-group">
          <button class="btn btn-primary">Submit</button>
        </div>
     </form>
    </div>
  <!-- <div class="row justify-content-center">
      <div class="col-md-8">
          <div class="card card-default">
              <div class="card-header">Home Component</div>

              <div class="card-body">
                  I'm the Home Component component.
              </div>
          </div>
      </div>
  </div> -->
</template>
<script>
export default {
    data(){
        return {
            query:{}
        }
    },
    methods: {
        getWeather(){
            /* eslint-disable */
            const date = this.query.date;
            const location = this.query.location;

            // Set date to UNIX time (in a format Dark Sky accepts)
            let parsedDate = Date.parse(this.query.date);
            parsedDate = parsedDate / 10000

            // API Keys
            const locationKey = process.env.VUE_APP_LOCATION;
            const skyKey = process.env.VUE_APP_SKY;

            // NESTED API CALLS (LocationIQ and Dark Sky)
            // Find latitude and longitude for a given place
            const getLocationURL = 'https://us1.locationiq.com/v1/search.php';
            this.axios.get(getLocationURL, {
            params: {
              key: locationKey,
              q: this.query.location,
              format: "json"
            }
            })
            .then((response) => {
      
                const lat = response.data[0].lat;
                const lon = response.data[0].lon;
                const tempProxy = 'https://cors-anywhere.herokuapp.com/';
                const getWeatherURL = `${tempProxy}https://api.darksky.net/forecast/${skyKey}/${lat},${lon},${parsedDate}`;

                // Get weather based on latitude and longitude
                this.axios.get(getWeatherURL)
                .then((weather) => {
                    console.log("Inside the nested call");
                    console.log("Daily:")
                    console.log(weather.data.daily);
                    console.log("Currently:")
                    console.log(weather.data.currently);
                    this.coolFunc();
                })
            })
            .catch((error) => {
                console.log(error);
            })

        },
        coolFunc() {
            console.log("**********I'm a helper function!");
        }
    }
}
</script>