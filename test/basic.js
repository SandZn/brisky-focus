'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
Element.prototype.inject(require('../lib'))
const trigger = require('brisky-events/trigger')
const s = require('vigour-state/s')

test('basic - focus property', function (t) {
  const elem = new Element({
    $: 'menu.items.$any',
    child: {
      focus: { $: '$parent.$parent.focus' },
      // xxx: { tag: 'xxx' }, crashes html - element
      text: { $: 'title' }
    }
  }, false)
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
  const app = render(elem, state)

  if ('body' in document) {
    document.body.appendChild(app)
    const css = document.createElement('link')
    css.href = './test/style.css'
    css.rel = 'stylesheet'
    document.head.appendChild(css)
  }

  t.true(elem.child.prototype.hasEvents, 'adds hasEvents on element')
  t.equal(state.menu.focus.val, state.get('menu.items.0'), 'correct initial "menu.focus"')
  t.equals(app.childNodes[0]._, elem.child.prototype, 'stores element on node')

  state.menu.focus.set('$.parent.items.2')
  t.equal(app.childNodes[2].className, 'focus', 'focus second child from state')

  trigger(app.childNodes[0], 'focus')
  t.equal(app.childNodes[0].className, 'focus', 'focus first child from event')
  t.equal(state.menu.focus.val, state.get('menu.items.0'), 'correct "focus"')

  trigger(app.childNodes[1], 'focus')
  t.equal(app.childNodes[1].className, 'focus', 'focus second child from event')
  t.equal(state.menu.focus.val, state.get('menu.items.1'), 'correct "focus"')
  t.end()
})

test('basic - error', function (t) {
  try {
    render({ key: 'app', focus: 'lulz' })
    t.fail('should crash')
  } catch (e) {
    t.equal(e.message, 'no subscription passed to focus "app"', 'correct error')
  }
  t.end()
})
