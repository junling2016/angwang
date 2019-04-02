export const arrayToTree = arr => {
  const arrCopy = JSON.parse(JSON.stringify(arr))
  const parentNodes = arrCopy.filter(item => !item.pid)
  const transfer = node => {
    arrCopy.forEach(item => {
      if (item.pid !== node.id) return

      if (node.children) {
        node.children.push(item)
      } else {
        node.children = [item]
      }
      transfer(item)
    })
  }

  parentNodes.forEach(parentNode => {
    transfer(parentNode)
  })

  return parentNodes
}
