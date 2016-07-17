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
  t.equal(app.childNodes[1].childNodes[0].className, 'focus', 'initial focus')
  trigger(app.childNodes[0], 'focus')
  t.equal(app.childNodes[1].childNodes[0].className, 'focus', 'no change on menu item after focus')
  t.equal(app.childNodes[0].className, 'focus', 'changed input item after focus')
  t.end()
})
