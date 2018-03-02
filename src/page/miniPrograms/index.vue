<template>
  <div class="editHomepageDate">
    <tools @save='handleSave' />
    <div class="edit-wrapper" v-if='!isLoading'>
      <EditData title='顶部轮播图' class="swiper">
        <div class="title-tools" slot="tools">
          <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('swiper')">新增</el-button>
        </div>
        <div class="content">
          <div class="edit-content">
            <div class="edit-swiper edit" v-for="item in getMiniHomepage.swiper.item">
              <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'swiper')"></i>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove(item)"
                :on-success="handleUploadSuccess(item)"
                :file-list="item.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <combinationInput :data='item'/>
            </div>
          </div>
        </div>
      </EditData>
      <EditData title='猜你喜欢' class="guesslike">
        <div class="title-tools" slot="tools">
          <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAdd('guesslike')">新增</el-button>
          <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="toggleGuesslikeGroupEntry">批量录入</el-button>
          <div class="num">
            共 <span :style="{color: 'red'}">{{getMiniHomepage.guesslike.item.length}}</span> 个商品
          </div>
          <!-- <div class="showkind">
            <el-radio-group v-model="guesslikeShowKind">
              <el-radio label="card">图片卡片</el-radio>
              <el-radio label="id">id卡片</el-radio>
            </el-radio-group>
          </div> -->
        </div>
        <div class="content">
          <div class="edit-guesslike-group" v-show="isGuesslikeGroupEntry">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入商品id，以英文','号分割，点击任意空白完成输入。由于本处未添加错误检查，所以，在输入时请注意不要错误，不要有空格"
              @change="handleChangeGuesslike"
              v-model="entryGuesslikes">
            </el-input>
          </div>
          <div class="edit-content edit-guesslike-wrapper">
            <div class="edit-guesslike edit" v-for="item in getMiniHomepage.guesslike.item">
              <i class="el-icon-circle-close-outline delete" @click="handleDelete(item, 'guesslike')"></i>
              <el-input v-model="item.id" placeholder="请输入内容" size="mini"></el-input>
            </div>
          </div>
        </div>
      </EditData>
    </div>
  </div>
</template>
<script>
  // TODO: 猜你喜欢 批量录入
  // TODO: 猜你喜欢 按从小到大排序
  // TODO: 猜你喜欢 卡片显示模式：带商品缩略图

  import EditData from '@/components/EditData'
  import combinationInput from '@/components/combinationInput'
  import tools from '@/components/tools'
  import api from '@/api'
  import { mapMutations, mapState } from 'vuex'

  import MINIHOMEPAGE_QUERY from '@/gql/miniHomepage/getMiniHomepage.gql'
  import MINIHOMEPAGE_MUTATION from '@/gql/miniHomepage/setMiniHomepage.gql'

  // 空数据，用于新建
  // 字段名与真实数据保持一致
  const emptyData = {
    swiper: {
      link: '',
      img: [],
      type: '1'
    },
    guide: {
      type: '1',
      title: '新的',
      link: '',
      img: []
    },
    handbags: {
      type: '1',
      link: '',
      img: []
    },
    travellife: {
      type: '1',
      link: '',
      img: []
    },
    fulldress: {
      type: '1',
      link: '',
      img: []
    },
    guesslike: {
      id: ''
    }
  }

  export default {
    name: 'editMiniPrograms',
    components: {
      EditData,
      combinationInput,
      tools
    },
    data () {
      return {
        guesslikeShowKind: 'card',
        getHomepage: JSON.parse(JSON.stringify(this.$store.state.miniHomepage.data)),
        uploadUrl: this.$store.state.uri + '/api/uploadImg',
        isGuesslikeGroupEntry: false, // 批量录入猜你喜欢开关
        entryGuesslikes: ''
      }
    },
    computed: {
      ...mapState({
        // 因为直接用computed做input的v-model，导致无法实时更新页面，所以，需要用watch监听data变化，并更新到getHomepage
        data: state => state.miniHomepage.data,
        isLoading: state => state.miniHomepage.isLoading,
        authorList: state => state.author.byId
      })
    },
    created () {
      this.$apollo.addSmartQuery('getMiniHomepage', {
        query: MINIHOMEPAGE_QUERY,
        result (res) {
          this.FETCH_MINIHOMEPAGE()
          console.log(res, '请求结果-小程序首页')
          this.STORE_MINIHOMEPAGE_DATA(res.data.getMiniHomepage)
        },
        error (err) {
          console.log(err)
        }
      })
    },
    mounted () {
      console.log(this)
    },
    methods: {
      ...mapMutations('miniHomepage', [
        'STORE_MINIHOMEPAGE_DATA',
        'UPDATE_MINIHOMEPAGE_DATA',
        'FETCH_MINIHOMEPAGE'
      ]),
      handleSave () {
        // TODO: save data
        this.$apollo.mutate({
          mutation: MINIHOMEPAGE_MUTATION,
          variables: {
            input: this.queryRemoveTypename(this.data)
          }
        })
        .then((res) => {
          console.log(res)
        })
      },
      handleAdd (name) {
        // TODO: 猜你喜欢，从小到大排列，并特殊显示新添加的数据
        this.getHomepage[name].item.push(emptyData[name])
      },
      handleDelete (item, name) {
        this.getHomepage[name].item.splice(this.getHomepage[name].item.indexOf(item), 1)
      },
      handleUploadSuccess (item) {
        return function uploadSuccess (response, file, fileList) {
          console.log(response)
          item.img.push({
            url: response.url
          })
          // console.log(item)
          // console.log(response, file, fileList)
        }
      },
      handlePreview () {

      },
      handleRemove (item) {
        return function remove (file, fileList) {
          console.log('删除图片', file, fileList, item)
          if (file.url.includes('http://venus-resource.oss-cn-shanghai.aliyuncs.com')) {
            let name = file.url.split('/').pop()
            console.log('删除的图片是：', name)
            api.deleteImg(name)
            .then((res) => {
              console.log('删除图片情况', res)
            })
          }
          item.img.splice(item.img.indexOf(file), 1)
        }
      },
      handleAuthorChange (item) {

      },
      toggleGuesslikeGroupEntry () {
        this.isGuesslikeGroupEntry = !this.isGuesslikeGroupEntry
      },
      handleChangeGuesslike () {
        console.log(this.entryGuesslikes)
        let guesslikeArr = this.entryGuesslikes.split(',')
        console.log(guesslikeArr)
        guesslikeArr.map((item) => {
          let obj = {
            id: item,
            __typename: 'guesslikeItem'
          }
          this.getHomepage.guesslike.item.push(obj)
        })
        this.isGuesslikeGroupEntry = false
      },
      queryRemoveTypename (item) {
        let newInput
        if (typeof item === 'object') {
          // 如果依然是对象类型（数组也是，递归调用），基本类型，复制到新对象
          if (Array.isArray(item)) {
            newInput = []
            for (let [index, value] of item.entries()) {
              if (typeof value === 'object') {
                newInput[index] = this.queryRemoveTypename(value)
              }
            }
          } else {
            newInput = {}
            for (let [key, value] of Object.entries(item)) {
              if (typeof value === 'object') {
                newInput[key] = this.queryRemoveTypename(value)
              } else {
                if (key !== '__typename') {
                  newInput[key] = value
                }
              }
            }
          }
        }
        return newInput
      }
    },
    watch: {
      data (newValue) {
        this.getMiniHomepage = JSON.parse(JSON.stringify(newValue))
      },
      getMiniHomepage: {
        handler: function (val) {
          let a = JSON.stringify(val)
          let b = JSON.stringify(this.$store.state.miniHomepage.data)
          if (a === b) {
            return
          }
          this.UPDATE_MINIHOMEPAGE_DATA(val)
          console.log('getMiniHomepage 改变了123')
        },
        deep: true
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editHomepageDate {
    height: 100%;
  }
  .editHomepageDate .tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    /* 修改 height 下边 edit-wrapper 的 height 一起修改 */
    box-shadow: 0px 0px 10px rgba(0,0,0,.8);
  }
  .edit-wrapper {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
  .edit-wrapper .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 2px solid #ddd;
  }
  .edit-wrapper .edit-main {
    margin: 10px 30px 30px;
  }
  .edit-wrapper .title-tools {
    display: flex;
  }
  .edit-wrapper .showkind {
    margin: 0 20px;
  }
  .edit-wrapper .main-title {
    display: inline-block;
    margin: 10px 0;
    padding: 10px;
    background-color: #ecf5ff;
    color: #409EFF;
  }
  .edit-wrapper .edit-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px dashed #ddd;
    margin: 0 30px;
    padding: 30px 0;
  }
  .edit-item {
    margin: 10px 0;
  }
  .edit-wrapper .edit {
    flex: none;
    width: 500px;
    position: relative;
    margin: 5px;
    padding: 30px;
    border: 1px solid #ddd;
  }
  .guide .subtitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
    color: rgb(39, 72, 98);
    border-left: 2px solid rgb(39, 72, 98);
  }
  .upload {
    margin-bottom: 10px;
  }
  .delete {
    right: 10px;
    top: 10px;
    position: absolute;
  }

  .edit-wrapper .edit-guesslike {
    width: 150px;
    padding: 0 25px;
    border: none;
  }
  .edit-wrapper .edit-guesslike-group {
    padding: 30px;
  }
  .edit-wrapper .edit-content.edit-guesslike-wrapper {
    justify-content: flex-start;
  }
  .edit-wrapper .edit-guesslike .delete {
    right: 5px;
    top: 7px;
  }
  .edit-wrapper .guesslike .num {
    margin: 0 10px;
  }
</style>
