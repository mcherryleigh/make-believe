/* eslint no-underscore_dangle: 0 */

/**
 * Create a RandomValue generator. Use the OptionsObject
 * to override default behavior.
 * @param {OptionsObject} [options] - An options object to set the seed and
 */
class RandomValue {
  constructor(opts) {
    let seed = Date.now();
    const options = Object.assign({}, opts);
    if (Number.isInteger(options.seed)) {
      seed = options.seed; // eslint-disable-line prefer-destructuring
    } else if (typeof options.seed === 'string' || options.seed instanceof String) {
      seed = Number(options.seed.split().map(char => char.charCodeAt(0)).join(''));
    }

    Object.assign(this, {
      _constant: 2147483647,
      _diff: 0.4999,
      _multiplier: 16807,
      _seed: seed,
    });

    this.seed = this._seed;
    this.state = this._seed;
  }

  gen() {
    this.state = (this.state * this._multiplier) % this._constant;
    return this.state;
  }

  /**
   * Run a function multiple times and return the result from each run in an array.
   * @param {function} func - A function to run many times.
   * @param {any[]} args - An array of args to pass to the function.
   * @param {number} amount - How many times to run the function.
   * @return {any[]} Return an array of values returned from the method.
   *
   * @example
   * import { RandomValue} from 'make-believe';
   * const rv = RandomValue({ seed: 123 });
   * const rand = rv.times(rv.rand, [], 2);
   * console.log(rand) // [ 0.0009782956922224683, 0.44222351763604534 ]
   */
  times(amount, fn) {
    let n = amount;
    if (typeof n === 'undefined') {
      n = 1;
    }
    let i = n;
    const arr = [];
    const params = Array
      .prototype
      .slice
      .call(arguments, 2); // eslint-disable-line prefer-rest-params

    for (i = Math.max(0, i) - 1; i >= 0; i -= 1) {
      arr.push(fn.apply(this, params));
    }

    return arr;
  }

  _double() {
    return (this.gen() / this._constant);
  }

  /**
   * Get a random integer within a range.
   * @param {number} max - The largest integer you might generate.
   * If null or undefined, Number.MAX_SAFE_INTEGER will be used instead.
   * @param {number} min - The smallest integer you might generate.
   * If null or undefined, Number.MAX_SAFE_INTEGER will be used instead.
   * @return {number} Return a random integer value.
   *
   * @example
   * import { RandomValue} from 'make-believe';
   * const rv = new RandomValue();
   * const rand = rv.randomInteger(3,-3);
   * console.log(rand) // one of [-3,-2,-1,0,1,2,3]
   */
  random(opts) {
    const options = Object.assign({}, opts);
    const min = Object.prototype.hasOwnProperty.call(options, 'min') ? options.min : 0;
    const max = Object.prototype.hasOwnProperty.call(options, 'max') ? options.max : 1;
    return min + ((max - min) * this._double());
  }

  randomInteger(opts) {
    const options = Object.assign({}, opts);
    const min = Object.prototype.hasOwnProperty.call(options, 'min') ? options.min : Number.MIN_SAFE_INTEGER;
    const max = Object.prototype.hasOwnProperty.call(options, 'max') ? options.max : Number.MAX_SAFE_INTEGER;
    const dbl = this._double();
    return Math.round(min + ((max - min) * dbl));
  }

  /**
   * Pick one or more values from an array. Returned values may include duplicates.
   * @param {any[]} pickArray - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any|any[]} Return a value or an array of values from the pickArray.
   *
   * @example
   * import { RandomValue} from 'make-believe';
   * const rv = RandomValue({ seed: 123 });
   *
   * const rand1 = rv.pick([1,2,3,4,5,6], 3) ;
   * console.log(rand1) // [ 1, 2, 6 ]
   */
  pick(pickArray, amount) {
    return this.times(() => pickArray[Math.floor(this.random() * pickArray.length)], amount, []);
  }

  /**
   * Pick one or more values from an array. Returned values will be from uniquely picked indexes.
   * @param {any[]} pickArray - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any|any[]} Return a value or an array of values from the pickArray.
   */
  pickUnique(pickArray, amount) {
    const outArray = this.shuffle(pickArray).slice(0, amount);
    return outArray;
  }

  /**
   * Pick one or more values from an array. Returned values may include duplicates.
   * @param {any[]} pickArray - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any|any[]} Return a value or an array of values from the pickArray.
   *
   * @example
   * import { RandomValue} from 'make-believe';
   * const rv = new RandomValue();
   *
   * const rand1 = rv.pickSeries([1,2,3,4,5,6], 3) ;
   * console.log(rand1) // [ 1, 2, 3 ]
   *
   * const rand2 = rv.pickSeries([1,2,3,4,5,6], 9) ;
   * console.log(rand) // [ 1, 2, 3, 4, 5, 6, 1, 2, 3 ]
   */
  pickSeries(pickArray, amount) {
    const totalArrays = Math.floor(amount / pickArray.length);
    const partialArrayLength = amount % pickArray.length;
    const result = [...new Array(totalArrays)]
      .map(() => pickArray)
      .concat(this.pick(pickArray, partialArrayLength));
    return [].concat.apply([], result); // eslint-disable-line prefer-spread
  }

  /**
   * Shuffles array in place.
   * @param {any[]} arr - items An array containing the items.
   * @return {any[]} Returns array after it has been shuffled.
   */
  shuffle(arr) {
    let j; let x; let i;
    for (i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(this.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j]; // eslint-disable-line no-param-reassign
      arr[j] = x; // eslint-disable-line no-param-reassign
      // TODO figure out how to do this without silencing eslint
    }
    return arr;
  }

  addPlugins(plugin) {
    this[plugin.name] = plugin.func;
  }
}

/**
 * A plugin object that can be added to RandomValue.
 * @typedef {Object} RandomValue~PluginObject
 * @property {String} RandomValue~PluginObject.name - The name of your function.
 * This will be used as the method name unless an altName is also provided.
 * @property {String} RandomValue~PluginObject.altName - An override that will be used
 * as the method name for your object
 * @property {function} RandomValue~PluginObject.func - A function returning a value
 * relative to your theme.
 */

/**
 * An options object when instantiating RandomValue.
 * @typedef {Object} RandomValue~OptionsObject
 * @property {number} RandomValue~OptionsObject.seed - The x coordinate.
 * @property {number} RandomValue~OptionsObject.verbose - The x coordinate.
 * @property {PluginObject[]} RandomValue~OptionsObject.plugins - The y coordinate.
 */

module.exports = RandomValue;
