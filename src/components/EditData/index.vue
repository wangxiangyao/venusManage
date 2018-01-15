<template>
  <div class="edit-swiper">
    <div class="title">
      <div class="title-text">{{title}}</div>
      <slot name="tools" />
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'EditData',
    props: {
      title: String
    },
    methods: {
      handleAdd () {
        this.$emit('add')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit-wrapper .title {
    display: flex;
    align-items: center;
    margin: 20px;
    padding: 0 10px;
    border-left: 2px solid rgb(137, 157, 192);
  }
  .edit-wrapper .title-text {
    margin-right: 20px;
    color: rgb(137, 157, 192);
    font-weight: bold;
  }
</style>
