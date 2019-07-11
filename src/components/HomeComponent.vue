<template>
 <div>
     <!-- <p>Hello</p> -->
     <form @submit.prevent="parseDateRange">
         <label>Enter Destination:</label>
         <input type="text" class="form-control" id="destination-input" v-model="query.location">
         <section class="dates-input">
         <label>From:</label>
         <input type="text" class="form-control" v-model="query.from">
         <label>Until:</label>
         <input type="text" class="form-control" v-model="query.until">
         </section>
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
        getWeather(unixDates){
            const location = this.query.location;

            // // Set date to UNIX time (in a format Dark Sky accepts)
            // let parsedDate = Date.parse(this.query.date);
            // parsedDate = parsedDate / 10000

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
      
                // console.log(unixDates);
                //  console.log("We got the location info!");
                console.log(`********* WEATHER REPORT FOR: ${location} *********`)
                const lat = response.data[0].lat;
                const lon = response.data[0].lon;
                const tempProxy = 'https://cors-anywhere.herokuapp.com/';

                for (let i = 0; i < unixDates.length; i += 1) {
                    const getWeatherURL = `${tempProxy}https://api.darksky.net/forecast/${skyKey}/${lat},${lon},${unixDates[i]}`;
                    // Get weather based on latitude and longitude
                    this.axios.get(getWeatherURL)
                    .then((weather) => {
                        this.isolateConditions(weather);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                };
            })
        },
        isolateConditions(weather) {
            console.log('***************');
            console.log(weather);

            const day = weather.data.daily.data[0];

            console.log(`Today's weather: ${day.icon}`);
            console.log("Temp High:")
            console.log(day.apparentTemperatureHigh);
            console.log("Temp Low");
            console.log(day.apparentTemperatureLow);

        },
        parseDateRange() {

        // console.log("INSIDE PARSEDATERANGE:");

        const fromDate = { 
            // Subtract 1 from month (because JavaScript counts months from 0)
            month: (this.query.from.split('-')[0]) - 1,
            day: this.query.from.split('-')[1],
            year: this.query.from.split('-')[2]
            };

        const untilDate = { 
            // Subtract 1 from month (because JavaScript counts months from 0)
            month: (this.query.until.split('-')[0]) - 1,
            day: this.query.until.split('-')[1],
            year: this.query.until.split('-')[2]
            };

        const unixDates = eachDay(
            new Date(fromDate.year, fromDate.month, fromDate.day),
            new Date(untilDate.year, untilDate.month, untilDate.day)
          ).map((date) =>  {
              return Date.parse(date) / 1000;
          });

        //   console.log(unixDates);
          this.getWeather(unixDates);

        }
    }
}
</script>

<style>
.btn-primary {
    margin-top: 1em;
}

#destination-input {
    max-width: 40%;
}

.form-control {
    max-width: 20%;
}

label {
    margin-top: 1em;
}
</style>