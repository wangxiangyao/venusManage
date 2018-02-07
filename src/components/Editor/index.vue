<template>
  <div class="editor">
    <mavon-editor
      :style="editorStyle"
      :toolbars="toolbars"
      :subfield="false"
      @save="handleSave"
      :default_open='defaultOpen'
      :toolbarsFlag='toolbarsFlag'
      :value='value'
      :placeholder='placeholder'
      @imgAdd="handleAddImg"
      @imgDel="handleDelImg"
      ref="md"
      @change='handleChange' ></mavon-editor>
  </div>
</template>

<script>
  // 完成: 预览界面：块级图片 默认居中，可编辑居左居右。
  // TODO: 在预览的饿时候：自定义标签匹配，渲染成商品。。未完成的部分：后端接口跨域问题
  // 完成: 支持自定颜色
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // import markdownItComponent from './markdownPlugin/markdown-it-vue-component.js'
  import api from '@/api'

  // const md = mavonEditor.mixins[0].data().s_markdown
  // md.use(markdownItComponent)

  export default {
    name: 'editor',
    props: {
      isRead: {
        type: Boolean,
        default: false
      },
      value: String,
      placeholder: String
    },
    data () {
      return {
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        editorStyle: {
          height: '100%',
          minHeight: 'auto',
          overflow: 'hiddne'
        }
      }
    },
    computed: {
      defaultOpen () {
        if (this.isRead) {
          return 'preview'
        }
        return 'edit'
      },
      toolbarsFlag () {
        return !this.isRead
      }
    },
    components: {
      'mavon-editor': mavonEditor
    },
    methods: {
      handleSave (val, render) {
        this.$emit('save', val, render)
      },
      handleChange (val, render) {
        this.$emit('change', val, render)
      },
      handleAddImg (pos, file) {
        console.log('添加图片', pos, file)
        let formdata = new FormData()
        formdata.append('file', file)
        api.uploadImg(formdata)
        .then((res) => {
          console.log(res)
          this.$refs.md.$img2Url(pos, res.url)
          console.log(this.$refs.md)
        })
      },
      handleDelImg (pos) {
        console.log('删除图片')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .editor {
    flex: 1;
    overflow: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  .editor .v-show-content img {
    max-width: 100%;
    height: auto;
  }
</style>
