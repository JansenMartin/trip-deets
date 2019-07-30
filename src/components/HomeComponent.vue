<template>
 <div class="form-list-container">
     <form @submit.prevent="parseDateRange">
         <label>Enter Destination:</label>
         <input type="text" class="form-control" id="destination-input" v-model="query.location">
         <section class="dates-input">
         <label>From:</label>
         <datepicker @selected="query.from = $event" @closed="test()" placeholder="Select Date"></datepicker>
         <label>Until:</label>
         <datepicker @selected="query.until = $event" @closed="test()" placeholder="Select Date"></datepicker>
         </section>
         <div class="form-group">
          <button class="btn btn-primary" id="submit-btn">Submit</button>
        </div>
     </form>
     <div class="packing-list-container" v-if="finished">
        <SummaryComponent :weatherData=data />
       <ListComponent :weatherData=data :userEmail=this.$parent.currentUser.email :destination=query.location />
     </div>
    </div>
</template>
<script>
 /* eslint-disable */
import ListComponent from "./ListComponent";
import SummaryComponent from "./SummaryComponent"
import Datepicker from 'vuejs-datepicker';

import { W_OK } from 'constants';
import { format, formatDistance, formatRelative, subDays, eachDay } from 'date-fns'
import moment from 'moment'

export default {
    components: {
    ListComponent,
    SummaryComponent,
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
          const formattedDate = moment(date).format('X');
          console.log(formattedDate);
          console.log("End of Formatter");
        },
        getWeather(unixDates){
            console.log(`******** GETTING WEATHER FOR ${unixDates}`)
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
                    //  const getWeatherURL = `${tempProxy}https://api.darksky.net/forecast/${skyKey}/${lat},${lon},1564163010`;
                    // const getWeatherURL = `http://localhost:3000/api/v1/json`;
                    // const getWeatherURL = `https://whispering-everglades-96543.herokuapp.com/api/v1/json`;
                    // Get weather based on latitude and longitude
                    this.axios.get(getWeatherURL, {
                      params: {
                        lat: lat,
                        lon: lon,
                        time: unixDates[i]
                      }
                    })
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

            console.log(`INSIDE ISOLATECONDITIONS FUNCTION: ${weather}`);
            const day = weather.data.daily.data[0];

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

        console.log("***** THIS IS THE MOMENT:")
        const reformattedDate = moment(this.query.from).format('YYYY/MM/DD');
        console.log(reformattedDate);

        // Use moment function to split date into an array
        const fromSplit = moment(this.query.from).toArray();
        // Assign month, day and year to respective keys
        const fromDate = { 
            month: fromSplit[1],
            day: fromSplit[2],
            year: fromSplit[0]
            };

        // Use moment function to split date into an array
        const untilSplit = moment(this.query.until).toArray();
        // Assign month, day and year to respective keys
        const untilDate = { 
            month: untilSplit[1],
            day: untilSplit[2],
            year: untilSplit[0]
            };

        // console.log(`***** PARSING DATE FOR: ${this.query.until}.  IT'S NOW AN OBJECT: ${untilDate}`)

        // console.log(untilDate);

        //  const unixDates = eachDay(
        //     new Date(fromDate.year, fromDate.month, fromDate.day),
        //     new Date(untilDate.year, untilDate.month, untilDate.day)
        //   );

        const unixDates = eachDay(
            new Date(fromDate.year, fromDate.month, fromDate.day),
            new Date(untilDate.year, untilDate.month, untilDate.day)
          ).map((date) =>  {
              return Date.parse(date) / 1000;
          });

        //   console.log(`There unix dates, here: ${unixDates}`)

          this.getWeather(unixDates);

        },
        markFinished(){
            this.finished = true;
        },
        test(event) {
            console.log("Testing....")
           console.log(this.$parent.currentUser.email);
        }
    }
}
</script>

<style>
#submit-btn {
 /* background-color: #3DD1C0; */
 margin-top: 2vw;
 color: white;
 font-weight: bold;     
 border: 0px;
}

.packing-list-container {
    max-width: 50%;
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