/* eslint-env jest */
/* eslint no-magic-numbers:0 */

'use strict';

const forAwait = require('../');

it('should throw if source is not an async iterable', () => {
  expect(() => forAwait(undefined)).toThrow();
  expect(() => forAwait(null)).toThrow();
});

it('should iterate over async iterable and resolve', () => {
  const asyncIterable = {
    * [Symbol.asyncIterator]() {
      yield Promise.resolve(1);
      yield Promise.resolve(2);
      yield Promise.resolve(3);
    },
  };
  const stub = jest.fn();
  const result = forAwait(asyncIterable, stub);
  expect(stub).not.toHaveBeenCalled();
  return result.then(() => {
    expect(stub).toHaveBeenCalledWith(1, 0, asyncIterable);
    expect(stub).toHaveBeenCalledWith(2, 1, asyncIterable);
    expect(stub).toHaveBeenCalledWith(3, 2, asyncIterable);
  });
});
