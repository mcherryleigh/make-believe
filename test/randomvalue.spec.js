import test from 'ava';

import { RandomValue } from '../src/index';

test('RandomValue - set a seed (positive integer)', (t) => {
  const rv = new RandomValue({ seed: 123 });
  t.is(rv.seed, 123);
  t.is(rv.state, 123);
});

test('RandomValue - set a seed (negative integer)', (t) => {
  const rv = new RandomValue({ seed: -123 });
  t.is(rv.seed, -123);
  t.is(rv.state, -123);
});

test('RandomValue - set a seed and pick next state', (t) => {
  const rv = new RandomValue({ seed: 123 });
  t.is(rv.state, 123);
  t.is(rv.seed, 123);
  rv.random();
  t.is(rv.state, 2067261);
});

test('RandomValue - if a seed isn\'t provided use Date.now()', (t) => {
  const rv = new RandomValue();
  t.true(typeof rv.seed === 'number'); // TODO find better way to test for actual Date.now() number
});

test('RandomValue - if a seed is a string convert it to an int', (t) => {
  const rv = new RandomValue({ seed: 'hello' });
  t.is(rv.seed, 104);
  t.is(rv.state, 104);
});

test('RandomValue - get random()', (t) => {
  const rv = new RandomValue({ seed: 'hello' });
  t.is(rv.random(), 0.0008139424029802635);
  t.is(rv.state, 1747928);
});

test('RandomValue - get randomInteger()', (t) => {
  const rv = new RandomValue({ seed: 'hello' });
  t.is(rv.randomInteger(), -8992536571929939);
  t.is(rv.randomInteger(), 3241330127341553);
  t.is(rv.randomInteger(), 1494357555977783);
});

test('RandomValue - get randomInteger() with max/min', (t) => {
  const rv = new RandomValue({ seed: 123 });
  t.is(rv.randomInteger({ min: -100, max: 100 }), -100);
  t.is(rv.randomInteger({ min: -100, max: 100 }), -64);
  t.is(rv.randomInteger({ min: -100, max: 100 }), 88);
});

test('RandomValue - get times() for class method with no args', (t) => {
  const rv = new RandomValue({ seed: 123 });
  t.deepEqual(
    rv.times(3, rv.random),
    [0.0009626434189093501, 0.1791479416094478, 0.9394546299890869],
  );
});

test('RandomValue - get times() for custom function with no args', (t) => {
  const rv = new RandomValue({ seed: 123 });
  t.deepEqual(
    rv.times(3, args => rv.random(args)),
    [0.0009626434189093501, 0.1791479416094478, 0.9394546299890869],
  );
});
