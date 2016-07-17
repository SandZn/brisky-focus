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
  const input = app.childNodes[0]
  const item = app.childNodes[1].childNodes[0]

  t.equal(item.className, 'focus', 'initial focus')
  trigger(input, 'focus')
  t.equal(item.className, 'focus', 'no change on menu item after focus')
  t.equal(input.className, 'focus', 'changed input item after focus')
  t.end()
})

test('root - no root focus', function (t) {
  const state = s({
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
      menu: {
        $: 'menu.items.$any',
        child: {
          focus: { $: '$parent.$parent.focus' },
          text: { $: 'title' }
        }
      }
    }, state)
  )
  const item = app.childNodes[0].childNodes[0]
  trigger(item, 'focus')
  t.equal(item.className, 'focus', 'changed item after focus')
  t.end()
})
