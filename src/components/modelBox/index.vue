<template>
  <div class="modelBox-wrapper">
    <div class="modelBox-item" v-for="item in model" :key="item.key">
      {{item.kind}}
    </div>
  </div>
</template>
<script>
  import model from '@/lib/initialModel.js'

  export default {
    name: 'modelBox',
    data () {
      return {
        model
      }
    }
  }
</script>

<style lang="css">
  .modelBox-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 30px 10px;
    width: 100%;
  }
  .modelBox-item {
    padding: 20px 60px;
    font-size: 20px;
    background-color: #409EFF;
    color: #fff;
    border-radius: 5px;
  }
</style>
