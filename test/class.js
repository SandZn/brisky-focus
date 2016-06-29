'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const parse = require('parse-element')

Element.prototype.inject(require('../lib'))

test('class', function (t) {
  const app = {
    $: 'menu.items.$any',
    child: {
      focus: { $: '$parent.$parent.focus' },
      text: { $: 'title' }
    }
  }

  const node = render(app, {
    focus: '$root.menu.focus',
    menu: {
      focus: '$root.menu.items.1',
      items: [
        { title: 'discover!' },
        { title: 'shows!' },
        { title: 'channels!' }
      ]
    }
  })

  if (global.document && 'body' in global.document) {
    global.document.body.appendChild(node)
  }

  parse(node)
  t.end()
})
