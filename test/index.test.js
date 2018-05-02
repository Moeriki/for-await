'use strict';

const forAwait = require('../index');
const asyncConsumer = require('../consumer');
const asyncGenerator = require('../generator');

it('should have consumer', () => {
  expect(forAwait).toHaveProperty('asyncConsumer', asyncConsumer);
});

it('should have generator', () => {
  expect(forAwait).toHaveProperty('asyncGenerator', asyncGenerator);
});
