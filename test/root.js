'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
Element.prototype.inject(require('../lib'))
const test = require('tape')
const trigger = require('brisky-events/trigger')
const s = require('vigour-state/s')
const browser = require('./browser')

test('root - switch focus', function (t) {
  const state = s({
    focus: '$root.menu.focus',
    menu: {
      focus: '$root.menu.items.0',
      items: [
        { title: 'discover!' },
        { title: 'shows!' },
        { title: 'channels!' }
      ]
    }
  })
  const app = browser(
    render({
      filterField: {
        tag: 'input',
        focus: { $: 'focus' }
      },
      menu: {
        $: 'menu.items.$any',
        child: {
          focus: { $: '$parent.$parent.focus' },
          text: { $: 'title' }
        }
      }
    }, state)
  )

  console.log(app)

  t.end()
})
