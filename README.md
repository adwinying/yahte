# yahte

Yet another HTML templating engine.

## Introduction

yahte (rhymes with arthur) is a HTML templating engine similar to [handlebars](https://github.com/handlebars-lang/handlebars.js), but with a [vue](https://vuejs.org/)-like syntax.
yahte parses a given input and generates HTML based on the special directives defined below.

## Who it is for

This library might be useful if you are:
- Building a static website with reusable components
- Looking to keep your static website DRY
- Not using any framework
- Looking for a templating engine to complement [alpine.js](https://alpinejs.dev/)
- Prioritizing your website's SEO

This library is probably not for you if you are:
- Building a dynamic web application
- Using a framework with a built-in templating engine
- Already using Vue or any other Javascript-based framework

## Installation

_Work in progress, subject to change_

```bash
npm install -D yahte
```

## Usage

```js
import { compile } from 'yahte'

const input = `<div>Hello {{ name }}</div>`
const data  = { name: 'world' }

const output = compile(input, data)

// output: <div>Hello world</div>
```

## Directives

Currently, the supported directives are as follows:

### Text interpolation

```js
// before
const input = `<div>Hello {{ name }}</div>`
const data  = { name: 'world' }

// renders <div>bar</div>
```

### Attribute binding

```js
// before
const input = `<div y-bind:foo="bar">Hello world</div>`
const data  = { bar: 'someValue' }

// renders <div foo="someValue">Hellow world</div>
```

### Conditionals

```js
// before
const input = `<div y-if="foo">I'm foo!></div>`
const data  = { foo: true }

// renders <div>I'm foo!</div>
```

```js
// before
const input = `<div y-if="foo">I'm foo!></div><div y-else>Not foo</div>`
const data  = { foo: false }

// renders <div>Not foo</div>
```


### Loops

```js
// before
const input = `<ul><li y-for="item in list">{{ item }}</li></ul>`
const data  = { list: ['one', 'two', 'three'] }

// renders <ul><li>one</li><li>two</li><li>three</li>
```

### [TODO] Components

```js
// <y-custom-component>
```

