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
      console.log('Hello there, ' + me.name)
      this.$emit('log-in', me.name);
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