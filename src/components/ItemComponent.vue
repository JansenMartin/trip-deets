<template>
  <li>
    {{item}}
  </li>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
        isComplete: false
      }
        
    }
  }
</script>