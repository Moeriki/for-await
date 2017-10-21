/* eslint-env jest */
/* eslint no-magic-numbers:0 */

'use strict';

const forAwait = require('./');

const NOOP = () => {
  /* */
};

// tests

it('should throw on non-function', () => {
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
  const result = forAwait(stub).of(asyncIterable);
  expect(stub).not.toHaveBeenCalled();
  return result.then(() => {
    expect(stub).toHaveBeenCalledWith(1, 0, asyncIterable);
    expect(stub).toHaveBeenCalledWith(2, 1, asyncIterable);
    expect(stub).toHaveBeenCalledWith(3, 2, asyncIterable);
  });
});

it('should iterate over array and return resolved promise', () => {
  const array = [1, 2, 3];
  const stub = jest.fn();
  const result = forAwait(stub).of(array);
  expect(stub).toHaveBeenCalledWith(1, 0, array);
  expect(stub).toHaveBeenCalledWith(2, 1, array);
  expect(stub).toHaveBeenCalledWith(3, 2, array);
  return result;
});

it('should iterate over sync iterable and return resolved promise', () => {
  function* generator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const stub = jest.fn();
  const syncIterable = generator();
  const result = forAwait(stub).of(syncIterable);
  expect(stub).toHaveBeenCalledWith(1, 0, syncIterable);
  expect(stub).toHaveBeenCalledWith(2, 1, syncIterable);
  expect(stub).toHaveBeenCalledWith(3, 2, syncIterable);
  return result;
});

it('should throw if source is not an iterable', () => {
  expect(() => forAwait(NOOP).of()).toThrow();
  expect(() => forAwait(NOOP).of(true)).toThrow();
});
