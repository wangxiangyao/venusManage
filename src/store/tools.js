function asignObjOriginHad (origin, data) {
  for (let key in data) {
    if (origin.hasOwnProperty(key)) {
      // 如果有源数据有key，则深度拷贝
      if (typeof origin[key] === 'object') {
        // 递归调用
        asignObjOriginHad(origin[key], data[key])
      } else {
        // 如果不是对象，直接拷贝
        if (origin[key] !== data[key]) {
          console.log('改变了', key, data[key])
          origin[key] = data[key]
        }
      }
    } else {
      // 如果没有包含这个key，如果key是对象，如果是img，只拷贝url，其他直接拷贝过去
      if (typeof data[key] === 'object') {
        if (data[key].__typename === 'imgItem') {
          origin[key] = { url: data[key].url }
        } else {
          origin[key] = data[key]
        }
      }
    }
  }
}

function asignObjDelete (origin, data) {
  for (let key in origin) {
    if (data.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object') {
        asignObjDelete(origin[key], data[key])
      }
    } else {
      if (typeof origin === 'object') {
        if (Array.isArray(origin)) {
          origin.splice(key, 1)
        }
      } else {
        delete origin[key]
      }
    }
  }
}

function asignObj (origin, data) {
  // 只有origin中存在的项才用data中的数据更新更新
  asignObjOriginHad(origin, data)
  console.log(origin)
  asignObjDelete(origin, data)

  return origin
}

export {
  asignObj
}
