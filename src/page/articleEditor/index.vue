<template>
  <div>
    <div class="loading" v-if="articleListIsLoading">
      加载中
    </div>
    <div v-else class="articleEditor-wrapper">
      <div class="articleList">
        <div class="actions">
          <div class="addArticle" @click="handleAddArticle">
            <i class="el-icon-circle-plus"></i>
            新建文章
          </div>
        </div>
        <div class="list">
          <div class="article-item" :key="item.id" :class="{select: articleSelect == item.id}" v-if="item" v-for="item in articleList" @click="handleSelectArticle(item.id)">
            <i class="el-icon-document article-file"></i>
            <div class="title">
              {{item.title}}
            </div>
            <div class="settings">
              <options>
                <div class="option" @click='handleCopyAppLink(item.id)'>
                  复制链接
                </div>
                <div class="option" @click='handleDeleteArticle(item.id)'>
                  删除
                </div>
              </options>
            </div>
          </div>
        </div>
      </div>
      <div class="articleContent">
        <div class="actions">
          <el-button type="primary" @click="handleSaveArticle">保存</el-button>
        </div>
        <div class="field" v-if="currentShowArticle">
          <div class="title">
            <el-input v-model="currentShowArticle.title" placeholder="请输入文章标题"></el-input>
          </div>
          <div class="author">
            <div class="th3-title">
              选择作者：
            </div>
            <el-select value-key="name" v-model="currentShowArticle.author" placeholder="请选择作者">
              <el-option
                v-for="item in authorList"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="picAbout">
            <div class="thump pic-item">
              <div class="title">
                缩略图
              </div>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-remove="handleRemovePic(currentShowArticle.thumbnail)"
                :on-success="handleUploadSuccessPic(currentShowArticle.thumbnail)"
                :file-list="currentShowArticle.thumbnail"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="mainPic pic-item">
              <div class="title">
                文章主图
              </div>
              <el-upload
                class="upload"
                :action="uploadUrl"
                :on-remove="handleRemovePic(currentShowArticle.mainPic)"
                :on-success="handleUploadSuccessPic(currentShowArticle.mainPic)"
                :file-list="currentShowArticle.mainPic"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="shareTitle">
            <el-input v-model="currentShowArticle.shareTitle" placeholder="微信分享标题"></el-input>
          </div>
          <div class="desc">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="微信分享描述"
              v-model="currentShowArticle.shareDesc">
            </el-input>
          </div>
        </div>
        <div class="content" v-if="currentShowArticle">
          <Editor
            :value="currentShowArticle.content"
            @save="handleSaveArticle"
            @change="handleChangeArticleContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO: ctrl + s 保存
  import Editor from '@/components/Editor'
  import options from '@/components/options'
  import api from '@/api'
  import clipboard from 'clipboard-polyfill'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'articleEditor',
    components: {
      Editor,
      options
    },
    data () {
      return {
        articleList: JSON.parse(JSON.stringify(this.$store.state.article.byId)),
        articleSelect: '',
        authorList: JSON.parse(JSON.stringify(this.$store.state.author.byId)),
        uploadUrl: this.$store.state.uri + '/api/uploadImg'
      }
    },
    computed: {
      ...mapState('author', [
        'isLoading',
        'isSave',
        'isChanged'
      ]),
      ...mapState('article', {
        'articleListIsLoading': state => state.isLoading
      }),
      currentShowArticle () {
        if (this.articleList) {
          return this.articleList[this.articleSelect]
        }
      }
    },
    created () {
      // 获取文章列表
      this.getArticleList()
      .then((articleList) => {
        if (articleList.length > 0) {
          this.articleSelect = articleList[0].id
          return this.getArticle(articleList[0].id)
        }
      })
    },
    methods: {
      ...mapActions('article', {
        getArticleList: 'getArticleList',
        getArticle: 'getArticle',
        saveArticle: 'saveArticle',
        addArticle: 'addArticle',
        deleteArticle: 'deleteArticle'
      }),
      handleAddArticle () {
        this.addArticle()
      },
      handleChangeArticleContent (val, render) {
        this.currentShowArticle.content = val
      },
      handleSelectArticle (id) {
        console.log('选择文章', id)
        this.articleSelect = id
        this.getArticle(id)
      },
      handleDeleteArticle (id) {
        // TODO: 删除文章
        this.deleteArticle(id)
      },
      handleSaveArticle () {
        this.saveArticle(this.currentShowArticle)
      },
      handleRemovePic (img) {
        return function remove (file, fileList) {
          console.log('删除图片', file, fileList, img)
          if (file.url.includes('http://venus-resource.oss-cn-shanghai.aliyuncs.com')) {
            let name = file.url.split('/').pop()
            console.log('删除的图片是：', name)
            api.deleteImg(name)
            .then((res) => {
              console.log('删除图片情况', res)
            })
          }
          img.splice(img.indexOf(file), 1)
        }
      },
      handleUploadSuccessPic (img) {
        return function uploadSuccess (response, file, fileList) {
          console.log(response)
          img.push({
            url: response.url
          })
          // console.log(item)
          // console.log(response, file, fileList)
        }
      },
      handleCopyAppLink (id) {
        clipboard.writeText(`http://app.starluxe.cn/#/article/${id}`)
      }
    },
    watch: {
      isLoading (val) {
        this.authorList = JSON.parse(JSON.stringify(this.$store.state.author.byId))
      },
      articleListIsLoading (val) {
        this.articleList = JSON.parse(JSON.stringify(this.$store.state.article.byId))
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .articleEditor-wrapper {
    display: flex;
    height: calc(100vh - 90px);
  }
  .articleList {
    flex: none;
    padding: 20px 0;
    box-shadow: 0 -10px 10px rgba(0, 0, 0, .4);
  }
  .articleList .actions {
    width: 340px;
    padding: 10px 30px;
  }
  .addArticle {
    font-size: 20px;
  }
  .article-item {
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
  }
  .article-item.select {
    background-color: #efefef;
  }
  .article-item .title {
    flex: auto;
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 12px;
  }
  .article-item .article-file.hadSave {
    color: rgb(220, 91, 111);
  }

  .articleContent {
    display: flex;
    flex-direction: column;
    flex: auto;
    height: 100%;
    overflow-y: auto;
  }
  .articleContent .actions {
    padding: 10px;
  }
  .articleContent .field {
    padding: 10px;
  }
  .articleContent .field .author {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
  .articleContent .field .shareTitle {
    padding-bottom: 10px;
  }
  .articleContent .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: calc( 100vh - 90px);
    padding: 10px;
    flex: auto;
  }

  .articleContent .field .picAbout {
    display: flex;
    padding: 20px 0;
  }
  .picAbout .pic-item {
    flex: 1;
    padding: 0 20px;
  }
  .picAbout .title {
    border-left: 2px solid #000;
    padding: 0 10px;
    margin: 10px 0;
    vertical-align: center;
    color: #000;
    font-weight: bold;
  }
</style>
