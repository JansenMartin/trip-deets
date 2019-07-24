<template>
 <a class="nav-link" @click="Auth();" :class="class2">
 <span :class="class1"></span> Sign in with {{ provider }}
 </a>
</template>

<script>
/* eslint-disable */
import { OAuth } from "oauthio-web";
export default {
  props: ["provider"],
  data() {
    return {
    class1: "fa fa-" + this.provider,
    class2: "btn btn-block btn-social btn-" + this.provider,
    };
  },
  methods: {
    Auth() {
   OAuth.initialize('gwBeKj4tkaHLFf7q0fcYIlbj2as');

   OAuth.popup(this.provider).then((provider) => {
      return provider.me()
    }).then((me) => {
      console.log("Calling to our API now....")
      // 1.  DOES EMAIL EXIST INSIDE DATABASE?
      this.axios.get('http://localhost:3000/user', {
        params: {
          email: "loop@gmail.com"
        }
      })
      .then((response) => {
        // 2. IF THE EMAIL DOESN"T EXIST, MAKE A POST REQUEST
        console.log(response.data);
        if (response.data === null) {
          console.log("OH MAN, THAT USER DOESN'T EXIST IN OUR DATABASE")
           this.axios.post('http://localhost:3000/user', {
             name: "Loosie Goosie",
             email: "loop@gmail.com"
           })
           .catch((error) => {
             console.log(error);
           })
         // 3. IF THE EMAIL EXISTS, PROCEED AS NORMAL
        } else {
          console.log("The user already exists!!")
          console.log('HHHHHello there, ' + me.name)
          this.$emit('log-in', me.name);
        }

        this.$session.set("id",response.data._id)
        let key = this.$session.get("id")
        console.log(key);
      })
      // 2.  IF NO, THEN MAKE POST REQUEST
      // 3.  IF EMAIL EXISTS, THEN CARRY ON LIKE NORMAL
      //  this.axios.post('http://localhost:3000/user', {
      //    name: me.name,
      //    email: "symbologic@gmail.com"
      // })
      // .catch((error) => {
      //   console.log(error);
      // })
      // console.log('HHHHHello there, ' + me.name)
      // this.$emit('log-in', me.name);
    }).fail((error) => {
      console.error(error)
    });
   },
  }
};



</script>

<style>

/* @import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.0/css/bootstrap.css"; */
/* @import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css"; */
/* @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; */

</style>