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

  setToLower() {
    this.greater = false;
    this.equal = false;
  }

  setToEqual() {
    this.greater = false;
    this.equal = true;
  }

  setToGreater() {
    this.greater = true;
    this.equal = false;
  }

}

module.exports.CmpMemory = CmpMemory;