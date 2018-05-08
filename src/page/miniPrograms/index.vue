<template>
  <div class="editHomepageDate-wrapper">
    <div class="loading" v-if="isLoading">
      正在加载
    </div>
    <div v-else class="editHomepageDate" >
      <tools @save='handleSave' />
      <div class="edit-wrapper">
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
        <EditData title='专题' class="topics">
          <div class="title-tools" slot="tools">
            <el-button type="primary" size="mini" round icon="el-icon-circle-plus-outline" @click="handleAddTopic">新增</el-button>
          </div>
          <div class="content">
            <div class="edit-content">
              <div class="edit-swiper edit edit-topic" v-for="item in getMiniHomepage.topic">
                <i class="el-icon-circle-close-outline delete" @click="handleDeleteTopic(item)"></i>
                <el-input
                  type="input"
                  :style="{'margin': '10px 0'}"
                  placeholder="专题名"
                  v-model="item.main.title">
                </el-input>
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
                <div class="topic-desc">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="专题描述"
                    v-model="item.main.desc">
                  </el-input>
                </div>
                <div class="topic-commodity">
                  <commodityListShow
                    :commodityList="item.item"
                    title="专题商品"
                    :add="handleAddTopicCommodity(item.item)"
                    :addById="handleAddById(item.item)"
                    :delete="handleDeleteTopicCommodity(item.item)"
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </EditData>
        <commodityListShow itemName="guesslike"
          :commodityList="getMiniHomepage.guesslike.item"
          title="猜你喜欢"
          @delete="handleDelete"
          @add="handleAdd"
          :addById="handleAddById(getMiniHomepage.guesslike.item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
  // TODO: 猜你喜欢 批量录入
  // TODO: 猜你喜欢 按从小到大排序
  // TODO: 猜你喜欢 卡片显示模式：带商品缩略图

  /* 通过监听data,来把从后端请求的、存储在vuex的数据，深拷贝进组件的getData
   * 通过监听组件内的getData，把组件内进行的改变，提交到vuex
   *
   * 这样做是为了绕开存储在vuex中的数据无法直接修改的问题
  */

  import EditData from '@/components/EditData'
  import combinationInput from '@/components/combinationInput'
  import commodityListShow from '@/components/commodityListShow'
  import tools from '@/components/tools'
  import api from '@/api'
  import { mapMutations, mapState, mapActions } from 'vuex'

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
    topic: {
      main: {
        type: '5',
        title: '',
        desc: '',
        img: []
      },
      item: [{id: ''}]
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
      tools,
      commodityListShow
    },
    data () {
      return {
        getMiniHomepage: JSON.parse(JSON.stringify(this.$store.state.miniHomepage.data)),
        uploadUrl: this.$store.state.uri + '/api/uploadImg'
      }
    },
    computed: {
      ...mapState({
        // 因为直接用computed做input的v-model，导致无法实时更新页面，所以，需要用watch监听data变化，并更新到getHomepage
        isLoading: state => state.miniHomepage.isLoading,
        authorList: state => state.author.byId
      })
    },
    created () {
      this.queryMiniHomepage()
    },
    mounted () {
      console.log(this)
    },
    methods: {
      ...mapMutations('miniHomepage', [
        'UPDATE_MINIHOMEPAGE_DATA'
      ]),
      ...mapActions('miniHomepage', {
        queryMiniHomepage: 'getMiniHomepage',
        mutationMiniHomepage: 'setMiniHomepage'
      }),
      handleSave () {
        // TODO: save data
        this.UPDATE_MINIHOMEPAGE_DATA(JSON.parse(JSON.stringify(this.getMiniHomepage)))
        this.mutationMiniHomepage()
      },
      handleAdd (name) {
        // TODO: 猜你喜欢，从小到大排列，并特殊显示新添加的数据
        this.getMiniHomepage[name].item.push(JSON.parse(JSON.stringify(emptyData[name])))
      },
      handleAddTopic () {
        this.getMiniHomepage.topic.push(emptyData.topic)
      },
      handleAddTopicCommodity (item) {
        // item是当前topic的item字段
        return () => {
          item.push({id: ''})
        }
      },
      handleAddById (item) {
        // 用于批量录入
        return (commodity) => {
          item.push(commodity)
        }
      },
      handleDelete (item, name) {
        console.log(item, name)
        this.getMiniHomepage[name].item.splice(this.getMiniHomepage[name].item.indexOf(item), 1)
      },
      handleDeleteTopic (item) {
        this.getMiniHomepage.topic.splice(this.getMiniHomepage.topic.indexOf(item), 1)
      },
      handleDeleteTopicCommodity (item) {
        return (commodity) => {
          item.splice(item.indexOf(commodity), 1)
        }
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
      isLoading (newValue) {
        this.getMiniHomepage = JSON.parse(JSON.stringify(this.$store.state.miniHomepage.data))
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


  .edit-wrapper .edit-guesslike-group {
    padding: 30px;
  }
  .edit-swiper.edit-topic {
    width: 100%;
  }
</style>
