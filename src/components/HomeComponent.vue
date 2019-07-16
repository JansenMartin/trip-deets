<template>
 <div class="form-list-container">
     <!-- <p>Hello</p> -->
     <form @submit.prevent="parseDateRange">
         <label>Enter Destination:</label>
         <input type="text" class="form-control" id="destination-input" v-model="query.location">
         <section class="dates-input">
         <label>From:</label>
         <input type="text" class="form-control" v-model="query.from">
         <label>Until:</label>
         <!-- <input type="text" class="form-control" v-model="query.until"> -->
         <!-- <input type="date" name="until" v-model="query.until"> -->
         <datepicker @selected="query.until = $event" @closed="test()" placeholder="Select Date"></datepicker>
         </section>
         <div class="form-group">
          <button class="btn btn-primary">Submit</button>
        </div>
     </form>
     <div class="packing-list-container" v-if="finished">
       <ListComponent :weatherData=data />
     </div>
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
import ListComponent from "./ListComponent";
import { W_OK } from 'constants';
import { format, formatDistance, formatRelative, subDays, eachDay } from 'date-fns'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
// Vue.prototype.moment = moment

export default {
    components: {
    ListComponent,
    Datepicker
  },
    data(){
        return {
            query:{},
            data: [],
            checkNumber: 0,
            finished: false
        }
    },
    methods: {
        customFormatter(date) {
          console.log("Inside Formatter");
          const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
          console.log(formattedDate);
          console.log("End of Formatter");
        },
        getWeather(unixDates){
            console.log(`******** GETTING WEATHER UNTIL ${this.query.until}`)
            this.checkNumber = 0;
            this.data = [];
            this.finished = false;
            const location = this.query.location;

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
      
                console.log(`********* WEATHER REPORT FOR: ${location} *********`)
                const lat = response.data[0].lat;
                const lon = response.data[0].lon;
                const tempProxy = 'https://cors-anywhere.herokuapp.com/';

                for (let i = 0; i < unixDates.length; i += 1) {
                    const getWeatherURL = `${tempProxy}https://api.darksky.net/forecast/${skyKey}/${lat},${lon},${unixDates[i]}`;
                    // Get weather based on latitude and longitude
                    this.axios.get(getWeatherURL)
                    .then((weather) => {
                        this.isolateConditions(weather, unixDates.length);
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                };
            })
        },
        isolateConditions(weather, totalDays) {
            let todaysWeather = {
                icon: "",
                low: "",
                high: ""
            };

            const day = weather.data.daily.data[0];

            // console.log(`Today's weather: ${day.icon}`);
            // console.log("Temp High:")
            // console.log(day.apparentTemperatureHigh);
            // console.log("Temp Low");
            // console.log(day.apparentTemperatureLow);

            todaysWeather.icon = day.icon;
            todaysWeather.high = day.apparentTemperatureHigh;
            todaysWeather.low = day.apparentTemperatureLow;

            this.data.push(todaysWeather);
            this.checkNumber += 1;

            if (this.checkNumber == totalDays) {
             this.markFinished();
            }

        },
        parseDateRange() {

            console.log(`***** PARSING DATE FOR: ${this.query.until}`)
            this.customFormatter(this.query.until);
            // const muhDate = Date.parse(this.query.until);
            // console.log(muhDate);

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

          this.getWeather(unixDates);

        },
        markFinished(){
            this.finished = true;
        },
        test(event) {
            console.log(this.query.until);
            console.log(this.query.from);
        }
    }
}
</script>

<style>
.packing-list-container {
    max-width: 50%;
    /* margin-right: 0px;
    padding-right: 0px; */
}

.form-list-container {
    display: flex;
}
.btn-primary {
    margin-top: 1em;
}

form {
    width: 50%;
}
#destination-input {
    max-width: 50%;
}

.form-control {
    max-width: 25%;
}

label {
    margin-top: 1em;
}
</style>