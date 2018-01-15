<template>
  <div class="combinationInput-wrapper">
    <div class="edit-link-type">
      <el-radio-group v-model="data.type">
        <el-radio label="1">资讯</el-radio>
        <el-radio label="2">商品</el-radio>
        <el-radio label="3">其他</el-radio>
      </el-radio-group>
    </div>
    <div class="input-type">
      <div class="select-link" v-if="data.type == '1'">
        <el-select v-model="data.link" filterable placeholder="请选择" :style="{width: '100%'}">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </div>
      <div class="input-commodity" v-else-if="data.type == '2'">
        <el-input placeholder="commodity id" v-model="data.link">
          <template slot="prepend">输入商品id</template>
        </el-input>
      </div>
      <div class="input-other" v-else>
        <el-input placeholder="代码将不检查输入，请保证输入的正确性" v-model="data.link" />
      </div>
    </div>
  </div>
</template>

<script>
// TODO: 类型检查，出错提示
// TODO: 显示资讯列表，显示商品id
  export default {
    name: 'combinationInput-wrapper',
    props: {
      data: Object
    },
    data () {
      return {
        options: [{
          value: 1,
          label: '你好'
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .combinationInput-wrapper {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
  }
  .edit-link-type {
    margin-bottom: 10px;
  }
</style>
