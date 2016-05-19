'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const focusNode = require('./focus')

exports.inject = [
  require('brisky-props'),
  require('brisky-class')
]

exports.class = {
  properties: {
    focus: {
      properties: {
        autofocus: true
      },
      render: {
        static (target, pnode, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          const focus = state.origin()
          if (focus) {
            const mypath = pnode._s.sid()
            var focused = target.compute(focus.sid() === mypath)
            if (focused && target.autofocus) {
              const rootfocus = focus.getRoot().focus
              if (rootfocus && rootfocus.origin().sid() === mypath) {
                focusNode(pnode)
              }
            }
          }
          target.collect(focused, target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

exports.properties = {
  focus (val) {
    if (!val.$) {
      throw new Error('no subscription passed to focus')
    }

    this.hasEvents = true

    this.set({
      class: { focus: val },
      on: { focus: { focus } }
    }, false)

    if (val.autofocus !== false) {
      if (!this.props || !this.props.tabindex) {
        this.setKey('props', { tabindex: 0 }, false)
      }
      // this.class.focus.autofocus = true
    }
  }
}

function focus (data, stamp) {
  const state = data.state
  const focus = state.lookUp('focus')
  const rootfocus = focus.getRoot().focus
  if (focus !== rootfocus) {
    focus.set(state, stamp)
    rootfocus.set(focus, stamp)
  } else {
    rootfocus.set(state, stamp)
  }
}
