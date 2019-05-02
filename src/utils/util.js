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

export const insertText = (obj, str) => {
  if (document.selection) {
    const sel = document.selection.createRange()
    sel.text = str
  } else if (
    typeof obj.selectionStart === 'number' &&
    typeof obj.selectionEnd === 'number'
  ) {
    const startPos = obj.selectionStart
    const endPos = obj.selectionEnd
    const tmpStr = obj.value
    let cursorPos = startPos

    obj.value =
      tmpStr.substring(0, startPos) +
      str +
      tmpStr.substring(endPos, tmpStr.length)
    cursorPos += str.length
    obj.selectionStart = obj.selectionEnd = cursorPos
  } else {
    obj.value += str
  }
}
