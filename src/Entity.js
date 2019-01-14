/* eslint-disable no-underscore-dangle */

/**
 * @class Entity
 * Class used to generate predictably random objects.
 */
class Entity {
  /**
   * Create an Entity. Provide options in an EntityOptionsObject
   * @param {Object} [options={
   *  verbose: false,
   *  plugins: []
   * }] - An options
   * object
   */
  constructor(options) {
    const defaults = {
      verbose: false,
    };
    this._options = Object.assign(defaults, options);
    this._schema = this._options.schema;
    this._variants = [];
    this._outputs = [];
  }

  /**
   * Get the seed that was used in the options object
   * @return {String} Return the seed that was used in the options object or the integer
   * which was generated if a seed was not given.
   */
  get schema() {
    return this._schema;
  }

  /**
   * Get a random integer within a range.
   * @method
   * @param {Object} schema - An object representing this entity's baseline schema.
   * @return {Entity} Return this entity.
   */
  setSchema(schema) {
    this._schema = schema;
    return this;
  }

  get options() {
    return this._options;
  }

  setOptions(options) {
    this._options = Object.assign(this._options, options);
    return this;
  }

  /**
   * Get the seed that was used in the options object
   * @return {String} Return the seed that was used in the options object or the integer
   * which was generated if a seed was not given.
   */
  get variants() {
    return this._variants;
  }

  /**
   * Add a variant to the Entity's schema
   * @method
   * @param {Object} variantSchema - An object representing how this object is
   * different from the schema.
   * @return {Entity} Return this entity.
   */
  addVariant(variant) {
    this._variants = this._variants.concat(variant);
    return this;
  }

  /**
   * Get any outputs that have been loaded into the Entity.
   * @method
   * @param {Object} variantSchema - An object representing how this object is
   * different from the schema.
   * @return {Entity} Return this entity.
   */
  get outputs() {
    return this._outputs;
  }

  addOutputs(outputs) {
    this._outputs = this._outputs.concat(outputs);
    return this;
  }
}

module.exports = Entity;

/**
 * @typedef {Object} Entity~OptionsObject
 * @type Object
 * @param {Number} [rv=null] - A configured RandomValue. If none is provided one will
 * be created using default settings
 * @param {Number} [verbose=false] - Use verbose to get additional console logging information.
 */
