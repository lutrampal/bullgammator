class CmpMemory {
  constructor() {
    this.greater = false;
    this.equal = false;
  }

  isLower() {
    return !this.equal && !this.greater;
  }

  isEqual() {
    return this.equal;
  }

  isLowerOrEqual() {
    return this.isLower() || this.isEqual();
  }

  isGreater() {
    return this.greater;
  }

  isGreaterOrEqual() {
    return this.isGreater() || this.isEqual();
  }

  isNotEqual() {
    return !this.isEqual();
  }

}

module.exports.CmpMemory = CmpMemory;