'use strict';

function forAwait(func) {
  if (typeof func !== 'function') {
    throw new Error(`Expected forAwait() to have been called with a function. Instead received ${func}.`);
  }
  function of(source) {
    if (source == null) {
      throw new Error(`Expected source to neqeq null. Received ${source}`);
    }
    if (source[Symbol.asyncIterator]) {
      const generator = source[Symbol.asyncIterator]();
      let index = 0;
      const next = () => {
        const result = generator.next();
        return !result.done && result.value.then((value) => func(value, index++, source)).then(next);
      };
      return next();
    }
    throw new Error(`Expected source to be an async iterable. Received ${source}.`);
  }
  return { of };
}

module.exports = forAwait;
