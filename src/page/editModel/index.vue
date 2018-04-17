<template>
  <div class="editModel-wrapper">
    <modelBox />
    <div class="edit-box">
      <div class="stage">
        我是展示区域
      </div>
      <div class="edit">
        <model :content="content" />
      </div>
    </div>
  </div>
</template>

<script>
  import modelBox from '@/components/modelBox'
  import model from '@/components/contentModel'
  export default {
    name: 'editModel',
    components: {
      modelBox,
      model
    },
    data () {
      return {
        content: {}
      }
    }
  }
</script>

<style lang="css" scoped>
  .edit-box {
    display: flex;
  }
  .edit {
    width: 70%;
    height: 300px;
    background-color: #ccc;
  }
</style>
