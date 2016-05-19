# brisky-focus
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky-focus.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-focus)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-focus.svg)](https://badge.fury.io/js/brisky-focus)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-focus/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-focus?branch=master)
<!-- VDOC END -->

###example
```js
const focusableMenu = {
  $: 'menu.items.$any',
  focusableMenuItem = {
    text: {
      $: 'title'
    },
    focus: {
      $: '$parent.$parent.focus' // define focus (usually defined on holder)
      autofocus: true // define if dom:focus is applied (defaults to true)
    }
  }
}

const state = {
  menu: {
    focus: '$root.menu.items.0',
    items: [
      { title: 'one item' },
      { title: 'two item' },
      { title: 'three item' }
    ]
  }
}

document.body.appendChild(render(carousel, state))
```