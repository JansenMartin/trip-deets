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

            const key = process.env.VUE_APP_SECRET;
            console.log("Inside HomeComponent:");
            console.log(key);
            let getURL = 'https://us1.locationiq.com/v1/search.php';

            this.axios.get(getURL, {
            params: {
              key: key,
              q: this.query.location,
              format: "json"
            }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

        }
    }
}
</script>