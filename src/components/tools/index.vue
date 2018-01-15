<template lang="html">
  <div class="tools">
    <div class="counsel">
      珍爱生命，勤点保存 ——>
    </div>
    <div class="save" :style="{margin: '0 10px'}">
      <el-button type="success" @click='handleSave'>保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tools',
  methods: {
    handleSave () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="css">
  .tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    /* 修改 height 下边 edit-wrapper 的 height 一起修改 */
    box-shadow: 0px 0px 10px rgba(0,0,0,.8);
  }
</style>
