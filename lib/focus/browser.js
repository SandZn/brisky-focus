'use strict'
const raf = global.requestAnimationFrame

module.exports = function focusNode (pnode) {
  pnode.focus()
  if (document.activeElement !== pnode) {
    raf(() => pnode.focus())
  }
}
