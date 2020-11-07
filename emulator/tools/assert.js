module.exports = function assert(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}

module.exports.equal = function equal(x, y, errorMessage) {
  if (x !== y) {
    throw new Error(errorMessage);
  }
}
