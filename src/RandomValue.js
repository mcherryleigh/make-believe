/* eslint-disable no-underscore-dangle */

/**
 * @class RandomValue
 * Class used to generate predictably random series of values.
 */
class RandomValue {
  /**
   * @typedef {Object} PluginObject
   * @property {String} PluginObject.name - The name of your function. This will be used as the
   * method name unless an altName is also provided.
   * @property {String} PluginObject.altName - An override that will be used as the method name
   * for your object
   * @property {function} PluginObject.func - A function returning a value relative to your theme.
   */

  /**
   * @typedef {Object} OptionsObject
   * @property {number} OptionsObject.seed - The x coordinate.
   * @property {number} OptionsObject.verbose - The x coordinate.
   * @property {PluginObject[]} OptionsObject.plugins - The y coordinate.
   */

  /**
   * Create a RandomValue generator. Use the OptionsObject
   * to override default behavior.
   * @param {OptionsObject} [options] - An options object to set the seed and
   */
  constructor(options) {
    const defaults = {
      seed: Date.now(),
      verbose: false,
      plugins: [],
    };
    this._options = Object.assign(defaults, options);
    // TODO handle strings in seed value
    this._state = Math.abs(this._options.seed % 2147483646) + 1;
    if (this._state <= 0) this._state += 2147483646;
  }

  /**
   * Get the seed that was used in the options object
   * @return {String} Return the seed that was used in the options object or the integer
   * which was generated if a seed was not given.
   */
  get seed() {
    return this._options.seed;
  }

  /**
   * Get the seed that was used in the options object
   * @return {RandomValue} Return the seed that was used in the options object or the integer
   * which was generated if a seed was not given.
   */
  setSeed(seed) {
    this._options.seed = seed;
    return this;
  }

  /**
   * Get the current state that will be used next random() call
   * @return {number} Return the current state of the random generator.
   */
  get state() {
    return this._state;
  }

  /**
   * Get the current state that will be used next random() call
   * @return {OptionsObject} Return the current state of the random generator.
   */
  get options() {
    return this._options;
  }

  next() {
    this._state = (this._state * 16807) % 2147483647;
    return this._state;
  }

  /**
   * Get the next random float in the series.
   * @return {number} Return the current state of the random generator.
   */
  random() {
    // TODO is this ok without using Math.abs approach from constructor?
    return (this.next() - 1) / 2147483646;
  }

  /**
   * Get a random integer within a range.
   * @param {number} min - The smallest integer you might generate.
   * @param {number} max - The largest integer you might generate.
   * @return {number} Return a random integer value.
   */
  randomInteger(options) {
    const one = this.random() * (options.max - options.min + 1);
    return Math.floor(one + options.min);
  }

  /**
   * Run a RandomValue method multiple times and return the result from each run in an array.
   * @param {function} func - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any[]} Return an array of values returned from the method.
   */
  times() {
    return this; // TODO
  }

  /**
   * Pick one or more values from an array. Returned values may include duplicates.
   * @param {any[]} pickArray - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any|any[]} Return a value or an array of values from the pickArray.
   */
  pick() {
    return this;
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
   * Run a RandomValue method multiple times and return a series of values from .
   * @param {function} method - An array of values to pick from.
   * @param {number} amount - How many values to pick from the array.
   * @return {any[]} Return an array of values returned from the method.
   */
  pickSeries() {
    return this; // TODO
  }

  /**
   * Pick one or more values from an array. Returned values will be picked weighted
   * relative to values given in the weightArray.
   * @param {any[]} pickArray - An array of values to pick from.
   * @param {number[]} weightArray - An array of values representing the weighting
   * values corresponding to the pickArray.
   * @param {number} amount - How many values to pick from the array.
   * @return {any|any[]} Return a value or an array of values from the pickArray.
   */
  pickWeighted() {
    return this; // TODO
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
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

  toJSON() {
    return {
      options: this._options,
      state: this._state,
    };
  }
}

module.exports = RandomValue;
