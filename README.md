# css-analyzer-diff [![Build Status](https://travis-ci.org/bartveneman/css-analyzer-diff.svg?branch=master)](https://travis-ci.org/bartveneman/css-analyzer-diff) [![Known Vulnerabilities](https://snyk.io/test/github/bartveneman/css-analyzer-diff/badge.svg)](https://snyk.io/test/github/bartveneman/css-analyzer-diff) ![Dependencies Status](https://img.shields.io/david/bartveneman/css-analyzer-diff.svg) ![Dependencies Status](https://img.shields.io/david/dev/bartveneman/css-analyzer-diff.svg)

Calculate the difference between two sets of [CSS stats](https://github.com/projectwallace/css-analyzer).

## Usage

```js
const differ = require('css-analyzer-diff');
const analyzeCss = require('@projectwallace/css-analyzer');

const [firstStats, secondStats] = await Promise.all([
  analyzeCss('.cat { color: brown; }'),
  analyzeCss('.cat { color: red; }')]
);
const changes = differ(firstStats, secondStats);

//=> Returns a Map with all changes
// Map {
//   'values.colors.unique' => [
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
