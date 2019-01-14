import test from 'ava';

import { RandomValue } from '../src/index';

test('RandomValue.setSeed() - set a seed', (t) => {
  const e = new RandomValue().setSeed({ hello: 'world' });
  t.deepEqual(e.seed, { hello: 'world' });
});
