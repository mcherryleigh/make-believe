import test from 'ava';

import { truly } from '../src/temp';

test('my passing test', (t) => {
  t.true(truly());
});
