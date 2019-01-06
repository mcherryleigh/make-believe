import test from 'ava';

import { truly } from '../src/index';

test('my passing test', (t) => {
  t.true(truly());
});
