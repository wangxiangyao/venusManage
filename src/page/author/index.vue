<template>
  <div class="author-wrapper">
    <tools @save="handleSave" />
    <div class="actions">
      <div class="new">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </div>
    <div class="author-list" v-if="!isLoading">
      <div class="author" v-for="item in authorList">
        <i class="el-icon-circle-close-outline delete-icon" @click="handleDelete(item.id)"></i>
        <div class="info">
          <div class="avator">
            <el-upload
              class="avatar-uploader"
              :action="imgUpLoadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess(item)"
              :before-upload="beforeAvatarUpload">
              <img v-if="item" :src="item.avator" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="name">
            <el-input v-model="item.name" placeholder="请输入内容" @change='handleChange(item.id)'></el-input>
          </div>
        </div>
        <div class="desc">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="个性签名"
            v-model="item.desc"
            @change='handleChange(item.id)'>
          </el-input>
        </div>
        <div class="tags">
          <div class="tag" v-for="(tag, index) in item.tag">
            <div class="tag-text">
              <el-input
               size="mini"
               placeholder="标签"
               v-model="tag.text"
               @change='handleChange(item.id)'>
             </el-input>
            </div>
            <div class="tag-delete" @click="handleTagDelete(item.tag, index)">
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <el-button size="mini" type="primary" @click="handleTagAdd(item)">新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO: 以后可以变成注册用户管理页
  // TODO: 头像上传，可以选择截取图片部分，可以放大，缩小
  import { mapActions, mapMutations, mapState } from 'vuex'
  import SET_AUTHORLIST from '@/gql/setAuthorList.gql'
  import tools from '@/components/tools'

  const emptyAuthor = {
    avator: '',
    desc: '',
    name: '',
    tag: [{
      text: ''
    }],
    id: ''
  }

  export default {
    name: 'authorList',
    components: {
      tools
    },
    data () {
      return {
        imgUpLoadUrl: this.$store.state.uri + '/api/uploadImg',
        authorList: JSON.parse(JSON.stringify(this.$store.state.author.byId))
      }
    },
    computed: {
      ...mapState('author', [
        'isLoading',
        'isSave',
        'isChanged'
      ])
    },
    created () {
      console.log(JSON.parse(JSON.stringify(this.$store.state.author)))
    },
    methods: {
      ...mapActions('author', {
        addAuthor: 'addAuthor',
        deleteAuthor: 'deleteAuthor'
      }),
      ...mapMutations('author', [
        'UPDATE_AUTHOR'
      ]),
      handleAvatarSuccess (item) {
        return function uploadAvatarSuccess (res, file) {
          console.log(res, file, item)
          item.avator = res.url
        }
      },
      beforeAvatarUpload () {
        console.log(1)
      },
      handleSave () {
        let authorList = []
        for (let key in this.authorList) {
          authorList.push(this.authorList[key])
        }
        this.$apollo.mutate({
          mutation: SET_AUTHORLIST,
          variables: {
            input: this.queryRemoveTypename(authorList)
          }
        })
        .then((res) => {
          console.log(res)
        })
      },
      handleAdd () {
        this.addAuthor(emptyAuthor)
      },
      handleDelete (id) {
        console.log(id)
        this.deleteAuthor(id)
      },
      handleChange (id) {
        this.UPDATE_AUTHOR({
          id,
          data: this.authorList[id]
        })
      },
      handleTagAdd (item) {
        item.tag.push({
          text: ''
        })
      },
      handleTagDelete (tag, index) {
        tag.splice(index, 1)
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
      isLoading (val) {
        this.authorList = JSON.parse(JSON.stringify(this.$store.state.author.byId))
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .author-wrapper .actions {
    padding: 20px 20px 0;
  }
  .author-wrapper .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .author-wrapper .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .author-wrapper .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .author-wrapper .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .author-wrapper .author-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px;
  }
  .author-wrapper .author {
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  }
  .author-wrapper .author .delete-icon {
    padding: 5px 10px;
  }
  .author-wrapper .author .info{
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 10px 0;
  }
  .author-wrapper .author .tags {
    display: flex;
    padding: 10px 0;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .author-wrapper .tag {
    display: flex;
    align-items: center;
    padding: 10px 10px;
  }
  .author-wrapper .tag .tag-text {
    width: 100px;
  }
</style>
