/**
 * A memory able to retain the result a comparison
 * Internal attributes 'greater' and 'equal' should be set manually
 */
class CmpMemory {

  /**
   * Constructs a new instance of CmpMemory
   */
  constructor() {
    this.greater = false;
    this.equal = false;
  }

  /**
   * @returns {boolean} true if the memory is set to lower
   */
  isLower() {
    return !this.equal && !this.greater;
  }

  /**
   * @returns {boolean} true if the memory is set to equal
   */
  isEqual() {
    return this.equal;
  }

  /**
   * @returns {boolean} true if the memory is set to lower or equal
   */
  isLowerOrEqual() {
    return this.isLower() || this.isEqual();
  }

  /**
   * @returns {boolean} true if the memory is set to greater
   */
  isGreater() {
    return this.greater;
  }

  /**
   *
   * @returns {boolean} true if the memory is set to greater or equal
   */
  isGreaterOrEqual() {
    return this.isGreater() || this.isEqual();
  }

  /**
   *
   * @returns {boolean} true if the memory is not set to equal
   */
  isNotEqual() {
    return !this.isEqual();
  }

}

module.exports.CmpMemory = CmpMemory;