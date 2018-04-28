'use strict';

function forAwait(source, iteratee) {
  if (source == null || source[Symbol.asyncIterator] == null) {
    throw new Error(`Expected source to be an async iterable, but got ${source}.`);
  }
  if (typeof iteratee !== 'function') {
    throw new Error(`Expected iteratee to be a function, but got ${iteratee}.`);
  }
  const generator = source[Symbol.asyncIterator]();
  let index = 0;
  const next = () => {
    const result = generator.next();
    return !result.done && result.value.then((value) => iteratee(value, index++, source)).then(next);
  };
  return next();
}

module.exports = forAwait;
