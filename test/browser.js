'use strict'
module.exports = function (app) {
  if ('body' in document) {
    document.body.appendChild(app)
    const css = document.createElement('link')
    css.href = './test/style.css'
    css.rel = 'stylesheet'
    document.head.appendChild(css)
  }
  return app
}
