<template>
  <li class="packing-list-item" @click="toggle" v-bind:class="{ complete: isComplete }">
    {{item}}
  </li>
</template>

<script>
/* eslint-disable */
  export default {
    props: ['item'],
    data () {
      return {
        isComplete: false
      }     
    },
    methods: {
      toggle() {
          this.isComplete = ! this.isComplete
      }
    }
  }
</script>

<style>
  .packing-list-item {
      /* display: inline-block; */
      border: 1px black solid;
      border-radius: 10px;
      text-align: center;
      list-style: none;
      height: 3vw;
      padding: 1em;
      /* max-width: 10em; */

      margin: 0px;
  }
  .complete {
    text-decoration: line-through;
  }
</style>