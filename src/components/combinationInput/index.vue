<template>
  <div class="combinationInput-wrapper">
    <div class="edit-link-type">
      <el-radio-group v-model="data.type">
        <el-radio label="1">资讯</el-radio>
        <el-radio label="2">商品</el-radio>
        <el-radio label="4">商品列表</el-radio>
        <el-radio label="5">品牌</el-radio>
        <el-radio label="3">其他</el-radio>
      </el-radio-group>
    </div>
    <div class="input-type">
      <div class="select-link" v-if="data.type == '1'">
        <el-select v-model="data.link" filterable placeholder="请选择资讯" :style="{width: '100%'}">
          <el-option
            v-for="option in articleList"
            :key="option.id"
            :label="option.title"
            :value="option.id">
          </el-option>
        </el-select>
      </div>
      <div class="select-link" v-else-if="data.type == '4'">
        <el-select v-model="data.link" filterable placeholder="请选择商品列表" :style="{width: '100%'}">
          <el-option
            v-for="option in commodityList"
            :key="option.link"
            :label="option.title"
            :value="option.link">
          </el-option>
        </el-select>
      </div>
      <div class="select-link" v-else-if="data.type == '5'">
        <el-select v-model="data.link" filterable placeholder="请选择品牌" :style="{width: '100%'}">
          <el-option
            v-for="option in brands"
            :key="option.id"
            :label="option.nameCn"
            :value="option.id">
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
  import { mapState } from 'vuex'
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
        }],
        commodityList: [
          {
            title: '包袋',
            link: '/#/commodity/CommodityHomepage/1'
          },
          {
            title: '礼服',
            link: '/#/commodity/CommodityHomepage/2'
          },
          {
            title: '旅行生活',
            link: '/#/commodity/CommodityHomepage/4'
          }
        ]
      }
    },
    computed: {
      ...mapState('article', {
        'articleList': 'byId'
      }),
      ...mapState(['brands'])
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
