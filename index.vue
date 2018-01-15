<template>
  <div class="transfer-input-wrapper">
    <someComponent ref='myComponent' />
  </div>
</template>
<script>
  // 功能: 1.验证（完成）
  export default {
    name: 'transfer-input-wrapper',
    mounted () {
      let childComponent = this.$refs.myComponent
      childComponent.open()
    }
  }
</script>
<style scoped>
  .transfer-input-wrapper {
    margin-bottom: 20px;
  }
  .label {
    display: flex;
    height: 55px;
  }
  .label-text {
    display: flex;
    align-items: center;
    font-size: 30px;
  }
  .message {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 10px;
    letter-spacing: 3px;
    font-size: 24px;
    border-radius: 10px;
  }
  .input-wrapper {
    display: flex;
    position: relative;
  }
  .input-item {
    font-size: 30px;
    padding: 5px;
    width: 100%;
    height: 70px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgb(238, 238, 238);
    outline: none;
  }
  .clear {
    position: absolute;
    right: 5px;
    top: calc(50% - 15px);
  }
  .icon-black {
    width: 30px;
    height: 30px;
    color: #d5d5d5;
  }
  .hint {
    background-color: #409eff;
    color: #fff;
  }
  .warning {
    background-color: #e6a23c;
    color: #fff;
  }
  .danger {
    background-color: #f56c6c;
    color: #fff;
  }
  .postposition-wrapper {
    display: flex;
    align-items: center;
    flex: 0 0 170px;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
</style>
