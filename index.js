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
        const { value: pendingValue, done } = generator.next();
        return !done && pendingValue
          .then((value) => func(value, index++, source))
          .then(next)
        ;
      };
      return next();
    } else if (source[Symbol.iterator]) {
      let index = 0;
      for (const value of source) {
        func(value, index++, source);
      }
    } else {
      throw new Error(`Expected source to be an iterable. Received ${source}.`);
    }
    // Return promise for consistency when Array or other sync iterable.
    return Promise.resolve();
  }
  return { of };
}

module.exports = forAwait;
