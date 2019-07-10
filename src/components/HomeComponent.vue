<template>
 <div>
     <p>Hello</p>
     <form @submit.prevent="parseDateRange">
         <label>Location:</label>
         <input type="text" class="form-control" v-model="query.location">
         <label>From:</label>
         <input type="text" class="form-control" v-model="query.from">
         <label>Until:</label>
         <input type="text" class="form-control" v-model="query.until">
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
 /* eslint-disable */
import { W_OK } from 'constants';
import { format, formatDistance, formatRelative, subDays, eachDay } from 'date-fns'

export default {
    data(){
        return {
            query:{}
        }
    },
    methods: {
        getWeather(){
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
              q: location,
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

                    this.isolateConditions(weather);
                })
            })
            .catch((error) => {
                console.log(error);
            })

        },
        isolateConditions(weather) {
            console.log("**********I'm a helper function!");

            this.parseDateRange();


            // const day = weather.data.daily.data[0];
            // // console.log(day);

            // console.log(`Today's weather: ${day.icon}`);
            // console.log("Temp High:")
            // console.log(day.apparentTemperatureHigh);
            // console.log("Temp Low");
            // console.log(day.apparentTemperatureLow);

        },
        parseDateRange() {

        console.log("INSIDE PARSEDATERANGE:");
        // console.log(this.query.from);
        // console.log(this.query.until);
        // console.log(this.query.from.split('-'));

        const fromDate = { 
            month: this.query.from.split('-')[0],
            day: this.query.from.split('-')[1],
            year: this.query.from.split('-')[2]
            };

        const untilDate = { 
            month: this.query.until.split('-')[0],
            day: this.query.until.split('-')[1],
            year: this.query.until.split('-')[2]
            };

        // console.log(fromDate);
        // console.log(untilDate);

        const unixDates = eachDay(
            new Date(fromDate.year, fromDate.month, fromDate.day),
            new Date(untilDate.year, untilDate.month, untilDate.day)
          ).map((date) =>  {
              return Date.parse(date);
          });


        // const unixDates = eachDay(
        //     new Date(2014, 9, 6),
        //     new Date(2014, 9, 10)
        //   ).map((date) =>  {
        //       return Date.parse(date);
        //   });

          console.log(unixDates);

        }
    }
}
</script>