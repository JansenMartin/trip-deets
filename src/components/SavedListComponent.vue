<template>
<!-- /* eslint-disable */ -->
<div>
<div v-if="this.$parent.loggedIn" class="saved-packing-list-container">
 <p v-if="this.list.length == 0">You don't have any saved trips yet!</p>
 <p v-if="this.list.length > 0"> Showing list for your trip to {{list[0].destination}}...</p>
<ul class="saved-packing-list" 
  v-for="item in list" 
  v-bind:key="item.item" >
      <ItemComponent v-on:toggle-change=changeList($event)
      :item=item />
</ul>
</div>

<p v-if="!this.$parent.loggedIn" class="alert">Please log in to view your lists.</p>
</div>
</template>

<script>
import ItemComponent from "./ItemComponent";

export default {
  /* eslint-disable */
  created() { 
      this.retrieveList();
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
     const email = this.$parent.currentUser.email
     this.axios.put(`http://localhost:3000/user?email=${email}`, {
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
.alert {
  background-color: #ffd3d9;
  padding: 1vw;
  margin-top: -1.7vw;
  margin-bottom: 1vw;
}
.saved-packing-list-container {
   max-width: 50%;
}

.saved-packing-list li {
   padding-top: .5em;
   margin-left: 3vw;
    margin-top: 1vw;
    display: inline-block;
    align-items: center;
}
</style>