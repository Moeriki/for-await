'use strict';

// exports

function asyncConsumer(source, iteratee, options) {
  // console.log(source.constructor);
  let iterable;
  if (source != null && Symbol.asyncIterator && Symbol.asyncIterator in source) {
    iterable = source[Symbol.asyncIterator]();
  } else if (typeof source === 'function' && source.constructor.name === 'AsyncGeneratorFunction') {
    iterable = source();
  } else {
    throw new Error(`Expected source to be a generator or an async iterable, but got ${source}.`);
  }
  let index = 0;
  // let slots = (options && options.concurrency) || 1;
  // const pending = new Set();
  // const results = [];
  // const next = () => {
  //   slots -= 1;
  //   if (slots !== 0) {
  //     next();
  //   }
  // };
  // next();
  const next = () => {
    const result = iterable.next();
    return !result.done && result.value.then((value) => iteratee(value, index++)).then(next);
  };
  return next();
}

module.exports = asyncConsumer;
