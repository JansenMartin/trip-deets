<template>
  <li @click="toggle" v-bind:class="{ complete: isComplete }">
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
  .complete {
    text-decoration: line-through;
  }
</style>