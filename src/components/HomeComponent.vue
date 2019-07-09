<template>
 <div>
     <p>Hello</p>
     <form @submit.prevent="addLocation">
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
        addLocation(){
            /* eslint-disable */
            // console.log(this.query);

            const locationKey = process.env.VUE_APP_LOCATION;
            const skyKey = process.env.VUE_APP_SKY;
            let getLocationURL = 'https://us1.locationiq.com/v1/search.php';

            this.axios.get(getLocationURL, {
            params: {
              key: locationKey,
              q: this.query.location,
              format: "json"
            }
            })
            .then((response) => {
                console.log("Latitude:");
                console.log(response.data[0].lat);
                console.log("Longitude:");
                console.log(response.data[0].lon);
                this.axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${skyKey}/48.8566969,2.3514616`)
                .then((reverse) => {
                    console.log("Inside the nested call");
                    console.log(reverse.data.currently);
                })
            })
            .catch((error) => {
                console.log(error);
            })

        }
    }
}
</script>