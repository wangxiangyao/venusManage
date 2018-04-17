<template>
  <div>我是一个模板</div>
</template>
<script>
  export default {
    name: 'contentModel',
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
