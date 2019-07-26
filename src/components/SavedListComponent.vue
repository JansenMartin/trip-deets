<template>
<!-- /* eslint-disable */ -->
<div>
<div v-if="this.$parent.loggedIn" class="packing-list-container">
<ul class="packing-list" 
  v-for="item in list" 
  v-bind:key="item.item" >
      <ItemComponent v-on:toggle-change=changeList($event)
      :item=item />
</ul>
</div>

<p v-if="!this.$parent.loggedIn">Please log in to view your lists.</p>
</div>
</template>

<script>
import ItemComponent from "./ItemComponent";

export default {
  /* eslint-disable */
  created() { 
      this.retrieveList();
    // this.generateList();
    // if (weatherData) {
    //   this.generateList();
    // } 
  },
  components: {
    ItemComponent
  },
  data(){
    return {
      // email: userEmail,
      list: [],
    //   listComplete: false,
    }
  },
  methods: {
      retrieveList() {
        if (!this.$parent.loggedIn) {
          this.$router.push('/')
        }
        console.log("HAVE AT THEE!!")
        // console.log(this.$parent.currentUser.email)
        const email = this.$parent.currentUser.email
        this.axios.get('http://localhost:3000/user', {
          params: {
            email: email
          }
      })
      .then((response) => {
        console.log(response.data.list)
        this.list = response.data.list
        })
      },
      saveList() {
    console.log("Triggering saveList function")
    console.log(this.$parent.currentUser.email)
     const email = this.$parent.currentUser.email
    // const email = "v.jansen.martin@gmail.com"
     this.axios.put(`http://localhost:3000/user?email=${email}`, {
            // list: [{item: "1 jacket", completed: false}]
            list: this.list
           })
           .then((response) => {
             console.log(response);
           })
           .catch((error) => {
             console.log(error);
           })
  },
      changeList(event) {
    console.log("Triggering Change List");
    let i;
    for (i = 0; this.list[i].item != event.item; i += 1 ) {
      console.log("Not it...")
      console.log(event.item);
    }

    console.log(`I found it!  ${this.list[i]}`)
    console.log(`Current status: ${this.list[i].completed}`)
    console.log("Now changing...")
    
    this.list[i].completed = !this.list[i].completed

    console.log(`New status: ${this.list[i].completed}`)

    this.saveList();
  }
  }
}
</script>

<style>
</style>