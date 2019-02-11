# css-analyzer-diff

[![NPM Version](https://img.shields.io/npm/v/css-analyzer-diff.svg)](https://www.npmjs.com/package/css-analyzer-diff) [![Build Status](https://travis-ci.org/bartveneman/css-analyzer-diff.svg?branch=master)](https://travis-ci.org/bartveneman/css-analyzer-diff) [![Known Vulnerabilities](https://snyk.io/test/github/bartveneman/css-analyzer-diff/badge.svg)](https://snyk.io/test/github/bartveneman/css-analyzer-diff) ![Dependencies Status](https://img.shields.io/david/bartveneman/css-analyzer-diff.svg) ![Dependencies Status](https://img.shields.io/david/dev/bartveneman/css-analyzer-diff.svg) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Calculate the difference between two sets of [CSS stats](https://github.com/projectwallace/css-analyzer).

## Usage

```js
const differ = require('css-analyzer-diff')
const analyzeCss = require('@projectwallace/css-analyzer')

const [firstStats, secondStats] = await Promise.all([
	analyzeCss('.cat { color: brown; }'),
	analyzeCss('.cat { color: red; }')
])
const changes = differ(firstStats, secondStats)

//=> Returns an object with all changes
// {
//   'values.colors.unique': [
//     {
//       value: 'brown',
//       removed: true,
//       added: false,
//       changed: true
//     },
//     {
//       value: 'red',
//       removed: false,
//       added: true,
//       changed: true
//     }
//  ],
//
//  ... many more ...
//
// }
```
