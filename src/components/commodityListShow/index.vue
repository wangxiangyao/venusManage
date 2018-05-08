<template>
  <div class="commodityList-wrapper">
    <div class="title">
      <div class="title-text">
        {{title}}
      </div>
      <div class="title-tools" slot="tools">
        <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="toggleGuesslikeGroupEntry">批量录入</el-button>
        <div class="num">
          共 <span :style="{color: 'red'}">{{commodityList.length}}</span> 个商品
        </div>
        <div class="showkind">
          <el-radio-group v-model="commodityShowKind">
            <el-radio label="card">图片卡片</el-radio>
            <el-radio label="id">id卡片</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="edit-guesslike-group" v-show="isGuesslikeGroupEntry">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入商品id，以英文','号分割，点击任意空白完成输入。由于本处未添加错误检查，所以，在输入时请注意不要错误，不要有空格"
          @change="handleChangeEntryGuesslike"
          v-model="entryGuesslikes">
        </el-input>
      </div>
      <div class="commodity-list-show-wrapper">
        <div class="edit" v-for="item in commodityList">
          <i class="el-icon-circle-close-outline delete" @click="handleDelete(item)"></i>
          <el-input v-model="item.id" placeholder="请输入内容" size="mini"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'commodityListShow',
    props: {
      commodityList: {
        type: Array,
        default: []
      },
      itemName: {
        type: String,
        default: ''
      },
      title: String,
      add: Function,
      addById: Function,
      delete: Function
    },
    components: {

    },
    data () {
      return {
        isGuesslikeGroupEntry: false,
        entryGuesslikes: '', // 批量录入时候，临时记录录入的字符串
        commodityShowKind: 'id' // 商品展示模式，纯id、带图片
      }
    },
    methods: {
      handleAdd () {
        if (this.add) {
          this.add()
          return
        }
        this.$emit('add', this.itemName)
      },
      handleDelete (item) {
        if (this.delete) {
          this.delete(item)
          return
        }
        this.$emit('delete', item, this.itemName)
      },
      toggleGuesslikeGroupEntry () {
        this.isGuesslikeGroupEntry = !this.isGuesslikeGroupEntry
      },
      handleChangeEntryGuesslike () {
        let guesslikeArr = this.entryGuesslikes.split(',')
        guesslikeArr.map((item) => {
          let obj = {
            id: item,
            __typename: 'guesslikeItem'
          }
          this.addById(obj)
        })
        this.isGuesslikeGroupEntry = false
      }
    }
  }
</script>
<style scoped>
.title {
  display: flex;
  margin: 20px;
  padding: 0 10px;
  border-left: 2px solid rgb(137,157,192);
  align-items: center;
}
.title-text {
  margin-right: 20px;
  color: rgb(137,157,192);
  font-weight: bold;
}
.title-tools {
  display: flex;
  flex: 1;
  align-items: center;
}
.num {
  margin: 0 10px;
}
.commodity-list-show-wrapper {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px dashed #ddd;
  margin: 0 30px;
  padding: 30px 0;
  justify-content: flex-start;
}
.edit {
  flex: none;
  position: relative;
  margin: 5px;
  width: 150px;
  padding: 0 25px;
  border: none;
}
.delete {
  position: absolute;
  right: 5px;
  top: 7px;
}
</style>
