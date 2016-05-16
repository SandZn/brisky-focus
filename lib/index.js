'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const focusNode = require('./focus')

exports.inject = require('brisky-class')

exports.class = {
  properties: {
    focus: {
      render: {
        static (target, pnode, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          const pnode = getParent(type, stamp, subs, tree, pid)
          const focus = state.compute()
          if (focus) {
            const mypath = pnode._s.sid()
            var focused = target.compute(focus.sid() === mypath)
            if (focused) {
              const rootfocus = focus.getRoot().focus
              if (rootfocus && rootfocus.compute().sid() === mypath) {
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
    this.hasEvents = true
    if (!this.props || !this.props.tabindex) {
      this.setKey('props', { tabindex: 0 }, false)
    }
    this.set({
      class: { focus: val },
      on: { focus: { focus } }
    }, false)
  }
}

function focus (e) {
  const target = e.target
  const elem = target._
  if (elem) {
    const f = elem.class.focus
    if (f && '$' in f) {
      focusState(target._s)
    }
  }
}

function focusState (state) {
  const focus = state.lookUp('focus')
  const rootfocus = focus.getRoot().focus
  rootfocus.set(focus)
  focus.set(state)
}
