<template>
  <li class="packing-list-item" @click="toggle" v-bind:class="{ complete: isComplete }">
    {{item.item}}
  </li>
</template>

<script>
/* eslint-disable */
  export default {
    props: ['item'],
    data () {
      return {
        isComplete: this.$props.item.completed
      }     
    },
    methods: {
      toggle() {
          this.isComplete = ! this.isComplete
          this.$emit('toggle-change', this.item)
      }
    }
  }
</script>

<style>
  .packing-list-item {
      border: 1px black solid;
      border-radius: 10px;
      text-align: center;
      list-style: none;
      height: 3vw;
      padding: 1em;
      font-weight: 600;
      transition-duration: .25s;
  }

  .packing-list-item:hover {
      background-color: #3dd1c0;
      color: white;
      padding-right: 1.25em;
      padding-left: 1.25em;
  }
  .complete {
    text-decoration: line-through;
    color: slategray;
  }

  .complete:hover {
      background-color: slategray;
      color: black;
  }
</style>