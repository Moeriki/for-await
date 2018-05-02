'use strict';

const asyncConsumer = require('../consumer');
const asyncGenerator = require('../generator');

describe('asyncConsumer', () => {
  it('should have tests');

  it('should throw if source is not an async iterable', () => {
    expect(() => asyncConsumer(undefined)).toThrow();
    expect(() => asyncConsumer(null)).toThrow();
  });

  xit('should consume async generator', async () => {
    const generator = asyncGenerator((yld) => {
      yld.next(1);
      yld.next(2);
      yld.next(3);
      yld.done();
    });
    const values = [];
    await asyncConsumer(generator, (value) => {
      values.push(value);
    });
    expect(values).toEqual([1, 2, 3]);
  });

  it('should consume async iterable', async () => {
    async function* generator() {
      yield await Promise.resolve(1);
      yield await Promise.resolve(2);
      yield await Promise.resolve(3);
    }
    const values = [];
    await asyncConsumer(generator, (value) => {
      values.push(value);
    });
    expect(values).toBe([1,2,3]);
  });
});
