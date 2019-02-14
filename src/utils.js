/* eslint-disable */
// TODO re-enable eslint when these functions begin to be used
// Currently keeping these around for future use
/**
 * The an Error() if the test isn't true
 * @param {boolean} test - A boolean value or operation that returns a boolean.
 * @param {} iteratee - A message to include in the thrown error
 * @return {Error} Throw an Error
 */
function _test(test, errorMessage) {
  if (test) {
    throw new Error(errorMessage);
  }
}

/**
 * Throw a RangeError if the test isn't true
 * @param {boolean} test - A boolean value or operation that returns a boolean.
 * @param {string} errorMessage - A message to include in the thrown error
 * @return {RangeError} Throw a RangeError
 */
function _testRange(test, errorMessage) {
  if (test) {
    throw new RangeError(errorMessage);
  }
}

/**
 * Throw a TypeError if the test isn't true
 * @param {boolean} test - A boolean value or operation that returns a boolean.
 * @param {string} errorMessage - A message to include in the thrown error
 * @return {TypeError} Throw a TypeError
 */
function _testType(test, errorMessage) {
  if (test) {
    throw new TypeError(errorMessage);
  }
}