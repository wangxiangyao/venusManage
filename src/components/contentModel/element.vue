<template>
  <div>我是一个元素</div>
</template>
<script>
  export default {
    name: 'contentElement',
    props: {
       content: {
         type: Object,
         required: true
       }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
