// 模型的初始属性

const model = {
  type: 'MODEL', // 表示，是一个模块 "ELEMENT",表示是一个元素
  key: '', // 模块键名
  kind: 'model',
  bg: '', //  图片链接，hex，rgb：http://tupian.com/1.jpg  #333 255,255,255
  style: {
    position: 'relative', // abolute
    display: 'flex',
    fontSize: '24px',
    color: '#000',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%', // 100vw px
    height: '100%', // 100vh px
    overflow: 'auto', // 滚动

    // 子内容版式
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    // 相对于父模板样式
    flex: 'none'
  },
  title: '', // 模块标题 可不填
  subContentModel: []
}

const pic = {
  type: 'ELEMENT',
  kind: 'pic',
  key: '',
  url: '',
  style: {
    position: 'relative', // abolute
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%', // 100vw px
    height: '100%', // 100vh px
    flex: 'none'
  }
}

const text = {
  type: 'ELEMENT',
  kind: 'text',
  key: '',
  content: '',
  style: {
    position: 'relative', // abolute
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    width: '100%', // 100vw px
    height: '100%', // 100vh px
    flex: 'none',

    fontSize: '24px',
    color: '#000',
    fontWeight: '400'
  }
}

export default {
  model,
  link: {
    ...model,
    link: '',
    kind: 'link'
  },
  pic,
  text
}
