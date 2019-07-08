<template>
 <div>
     <p>Hello</p>
     <form @submit.prevent="addLocation">
         <label>Location:</label>
         <input type="text" class="form-control" v-model="query.location">
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
            // eslint-disable-next-line
            console.log(this.query.location);
        }
    }
}
</script>