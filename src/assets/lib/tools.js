export function queryRemoveTypename (item) {
  let newInput
  if (typeof item === 'object') {
    // 如果依然是对象类型（数组也是，递归调用），基本类型，复制到新对象
    if (Array.isArray(item)) {
      newInput = []
      for (let [index, value] of item.entries()) {
        if (typeof value === 'object') {
          newInput[index] = queryRemoveTypename(value)
        }
      }
    } else {
      newInput = {}
      for (let [key, value] of Object.entries(item)) {
        if (typeof value === 'object') {
          newInput[key] = queryRemoveTypename(value)
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
