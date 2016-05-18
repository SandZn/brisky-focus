'use strict'
const raf = global.requestAnimationFrame
module.exports = function focusNode (node) {
  node.focus()
  if (node.value && node.tagName === 'TEXTAREA' ||
    (
      node.tagName === 'INPUT' &&
      (
        node.type === 'text' ||
        node.type === 'search' ||
        node.type === 'email' ||
        node.type === 'password'
      )
    )
  ) {
    raf(() => {
      if (node.value) {
        node.setSelectionRange(node.value.length, node.value.length)
      }
    })
  }
  if (document.activeElement !== node) {
    raf(() => node.focus())
  }
}
