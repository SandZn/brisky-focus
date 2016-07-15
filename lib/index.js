'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const focusNode = require('./focus')

exports.inject = [
  require('brisky-props'),
  require('brisky-class'),
  require('brisky-events')
]

exports.class = {
  properties: {
    focus: {
      properties: { autofocus: true },
      define: {
        extend: {
          render: {
            state (render, target, state, type, stamp, subs, tree, id, pid) {
              const pnode = getParent(type, stamp, subs, tree, pid)
              const focus = state.origin()
              var focused
              if (focus) {
                const mypath = pnode._s.origin().sid()
                focused = target.compute(focus.sid() === mypath)
                if (focused && target.autofocus) {
                  const rootfocus = state.getRoot().focus
                  if (rootfocus) {
                    const rootfocusOrigin = rootfocus.origin()
                    const originSid = rootfocusOrigin.sid()
                    if (originSid === mypath) {
                      const valSid = rootfocus.val.sid()
                      if (valSid === originSid || valSid === state.sid()) {
                        focusNode(pnode)
                      }
                    }
                  }
                }
              }
              render(target, focused ? 'focus' : '', type, stamp, subs, tree, id, pid)
            }
          }
        }
      }
    }
  }
}

exports.properties = {
  focus (val) {
    if (!val.$) {
      throw new Error(`no subscription passed to focus "${this.path().join('.')}"`)
    }
    this.set({
      hasEvents: true,
      class: { focus: val },
      on: { focus: { focus } }
    }, false)

    if (val.autofocus !== false) {
      if (!this.props || !this.props.tabindex) {
        this.setKey('props', { tabindex: 0 }, false)
      }
      this.class.focus.autofocus = true
    }
  }
}

function focus (data, stamp) {
  const state = data.state
  let focus = state.lookUp('focus')
  if (focus) {
    const rootfocus = focus && focus.getRoot().focus
    if (rootfocus) {
      if (focus !== rootfocus) {
        rootfocus.set(focus, stamp)
        focus.set(state, stamp)
      } else {
        rootfocus.set(state, stamp)
      }
    } else {
      focus.set(state, stamp)
    }
  }
}
