# Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
npm install --save make-believe
```

Make-Believe at its simplest can be used as a (predictable) random value generator


```javascript
import { RandomValue } from 'make-believe';
import { boolean, integer } from 'make-believe-values-basics';

const rv = new RandomValue()
  .seed('hello world')
  .addPlugins([
    [boolean, integer],
    {
      name: 'oneOrTwo',
      func: (rv, options) => {
        if (options.one) {
          return 1;
        }
        rv.pick([1, 2]);
      },
    },
  ]);

console.log(rv.boolean()); // false
console.log(rv.integer({ min: 0, max: 100 })); // 67
consolt.log(rv.oneOrTwo()); //  2
```