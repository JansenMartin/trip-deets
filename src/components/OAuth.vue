<template>
<div>
  <a v-if="!loggedIn" class="nav-link" @click="Auth();" :class="class2">
  <span :class="class1"></span> Sign in with {{ provider }}
  </a>
  <a v-if="loggedIn" @click="logOut()" class="nav-link" >
    Log out
  </a>
 </div>
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
    loggedIn: false
    };
  },
  methods: {
    logOut() {
      this.loggedIn = false
      this.$session.destroy()
      this.$emit('log-out');
    },
    Auth() {
   OAuth.initialize('gwBeKj4tkaHLFf7q0fcYIlbj2as');

   OAuth.popup(this.provider).then((provider) => {
      return provider.me()
    }).then((me) => {
      this.loggedIn = true;
      // 1.  DOES EMAIL EXIST INSIDE DATABASE?
      this.axios.get('http://localhost:3000/user', {
        params: {
          email: me.email
        }
      })
      .then((response) => {
        // 2. IF THE EMAIL DOESN"T EXIST, MAKE A POST REQUEST
        if (response.data === null) {
           this.axios.post('http://localhost:3000/user', {
             name: me.name,
             email: me.email
           })
           .then((postData) => {
            this.loggedIn = true;

            this.$session.set("id",postData.data._id)
            let key = this.$session.get("id")

            this.$emit('log-in', postData.data.name);
           })
           .catch((error) => {
             console.log(error);
           })
         // 3. IF THE EMAIL EXISTS, PROCEED AS NORMAL
        } else {
          const user = { name: me.name, email: me.email }
          this.$emit('log-in', user);

        this.loggedIn = true;

        this.$session.set("id",response.data._id)
        let key = this.$session.get("id")
        }

      })
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