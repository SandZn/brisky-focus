'use strict'
const raf = global.requestAnimationFrame
const ua = require('vigour-ua')

// add tests for this as well (shim raf)
module.exports = ua.device !== 'tablet' && ua.device !== 'phone'
  ? function focusNode (node) {
    node.focus()
    if (node.value && node.tagName === 'TEXTAREA' ||
      (
        node.tagName === 'INPUT' &&
        (
          node.type === 'text' ||
          node.type === 'search' ||
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
  } : function focusNode () {}
