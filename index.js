'use strict';

const isAsyncIterable = (source) => source != null && Symbol.asyncIterator in source;
const isGenerator = (source) => typeof source === 'function' && source.constructor.name === 'GeneratorFunction';

// exports

function forAwait(source, iteratee) {
  let iterable;
  if (isAsyncIterable(source)) {
    iterable = source[Symbol.asyncIterator]();
  } else if (isGenerator(source)) {
    iterable = source();
  } else {
    throw new Error(`Expected source to be a generator or an async iterable, but got ${source}.`);
  }
  let index = 0;
  const next = () => {
    const result = iterable.next();
    return !result.done && result.value.then((value) => iteratee(value, index++)).then(next);
  };
  return next();
}

module.exports = forAwait;
