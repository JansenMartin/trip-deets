<template>
  <div class="{ complete: isComplete }">

  </div>
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