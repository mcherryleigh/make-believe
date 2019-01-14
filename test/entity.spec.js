import test from 'ava';

import { Entity } from '../src/index';

test('Entity.setSchema() - set a schema', (t) => {
  const e = new Entity().setSchema({ hello: 'world' });
  t.deepEqual(e.schema, { hello: 'world' });
});

test('Entity.setOptions() - reset options', (t) => {
  const e = new Entity().setOptions({ verbose: true });
  t.deepEqual(e.options, { verbose: true });
});

test('Entity.addVariant() - add new variant', (t) => {
  const e = new Entity().addVariant({ different: 'schema' });
  t.deepEqual(e.variants, [{ different: 'schema' }]);
});

test('Entity.addOutput() - add new output', (t) => {
  const e = new Entity().addOutputs({ output: 'somewhere' });
  t.deepEqual(e.outputs, [{ output: 'somewhere' }]);
});
