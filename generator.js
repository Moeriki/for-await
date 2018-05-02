'use strict';

const DONE = { done: true, value: undefined };

// private

function AsyncGeneratorFunction(producer) {
  this.producer = producer;
}

Object.assign(AsyncGeneratorFunction.prototype, {
  next() {
    if (this.producer.generationQueue.length) {
      return Promise.resolve(this.producer.generationQueue.shift());
    }
    if (this.producer.isDone) {
      return Promise.resolve(DONE);
    }
    const defered = new Defered();
    this.producer.consumationQueue.push(defered);
    return defered.promise;
  },
});

function Defered() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
}

function Producer() {
  this.consumationQueue = [];
  this.isDone = false;
  this.generationQueue = [];
}

Object.assign(Producer.prototype, {
  done() {
    this.isDone = true;
    if (this.consumationQueue.length) {
      while (this.consumationQueue.length) {
        this.consumationQueue.shift().resolve(DONE);
      }
    } else {
      this.generationQueue.push(DONE);
    }
  },
  next(value) {
    // if (this.isDone) {
    //   throw new Error('You tried to produce a value on a finished generator.');
    // }
    const resolution = { done: false, value };
    if (this.consumationQueue.length) {
      this.consumationQueue.shift().resolve(resolution);
    } else {
      this.generationQueue.push(resolution);
    }
  },
});

// exports

function asyncGenerator(func) {
  const producer = new Producer();
  func(producer);
  return new AsyncGeneratorFunction(producer);
}

module.exports = asyncGenerator;
