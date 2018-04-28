<p align="center">
  <h3 align="center">for-await</h3>
  <p align="center">An utility to consume async iterables.<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/for-await">
      <img src="https://img.shields.io/npm/v/for-await.svg" alt="npm version">
    </a>
    <a href="https://travis-ci.org/Moeriki/for-await">
      <img src="https://travis-ci.org/Moeriki/for-await.svg?branch=master" alt="Build Status"></img>
    </a>
    <a href="https://coveralls.io/github/Moeriki/for-await?branch=master">
      <img src="https://coveralls.io/repos/github/Moeriki/for-await/badge.svg?branch=master" alt="Coverage Status"></img>
    </a>
    <a href="https://david-dm.org/moeriki/for-await">
      <img src="https://david-dm.org/moeriki/for-await/status.svg" alt="dependencies Status"></img>
    </a>
  </p>
</p>

---

This may come in handy if you

1.  don't run NodeJS v10 yet
2.  want concurrency control

## Install

```sh
npm install --save for-await
```

```js
const forAwait = require('for-await');
```

## Usage

```js
forAwait(
  asyncGenerator(),
  (item) => { /* handle item */ }
).then(() => {
  // all done
});

```

## API

`forAwait( source:asyncIterable, func:function ) :Promise`

`func` is called with `item`, `index`, `source`.

`of` returns a Promise that resolves when iteration has finished.
