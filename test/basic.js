'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')

Element.prototype.inject(require('../lib'))

test('focus - add focus property', function (t) {
  var elem, node
  t.plan(2)

  elem = new Element({
    $: 'menu.items.$any',
    child: {
      focus: { $: '$parent.$parent.focus' },
      text: { $: 'title' }
    }
  }, false)

  node = render(elem, {
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

  t.true(elem.child.prototype.hasEvents, 'adds hasEvents on element')
  t.equals(node.childNodes[0]._, elem.child.prototype, 'stores element on node')
})
