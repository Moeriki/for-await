'use strict';

const delay = require('delay');

const asyncGenerator = require('../generator');

describe('asyncGenerator', () => {
  it('should generate values', async () => {
    const generator = asyncGenerator((yld) => {
      yld.next(1);
      yld.next(2);
      yld.next(3);
      yld.done();
    });
    expect(await generator.next()).toEqual({ done: false, value: 1 });
    expect(await generator.next()).toEqual({ done: false, value: 2 });
    expect(await generator.next()).toEqual({ done: false, value: 3 });
    expect(await generator.next()).toEqual({ done: true, value: undefined });
  });

  it('should generate faster than consume', async () => {
    const generator = asyncGenerator((yld) => {
      yld.next(1);
      yld.next(2);
      yld.next(3);
      yld.done();
    });
    await delay(10);
    expect(await generator.next()).toEqual({ done: false, value: 1 });
    expect(await generator.next()).toEqual({ done: false, value: 2 });
    expect(await generator.next()).toEqual({ done: false, value: 3 });
    expect(await generator.next()).toEqual({ done: true, value: undefined });
  });

  it('should consume faster than generate', async () => {
    const generator = asyncGenerator(async (yld) => {
      await delay(10);
      yld.next(1);
      await delay(10);
      yld.next(2);
      await delay(10);
      yld.next(3);
      await delay(10);
      yld.done();
    });
    const p1 = generator.next();
    const p2 = generator.next();
    const p3 = generator.next();
    const p4 = generator.next();
    const p5 = generator.next();
    expect(await Promise.all([p1, p2, p3, p4, p5])).toEqual([
      { done: false, value: 1 },
      { done: false, value: 2 },
      { done: false, value: 3 },
      { done: true, value: undefined },
      { done: true, value: undefined },
    ]);
    expect(await generator.next()).toEqual({ value: undefined, done: true });
  })
});
