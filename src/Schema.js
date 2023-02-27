class Schema {
  constructor(moreValidationFuncs = {}) {
    this.predicates = [];
    this.obligatory = false;
    this.moreValidationFuncs = { ...moreValidationFuncs };
  }

  isValid(value) {
    const totalPredicate = this.buildTotalPredicate();
    return totalPredicate(value);
  }

  required() {
    this.obligatory = true;
    return this;
  }

  test(funcName, ...args) {
    if (funcName in this.moreValidationFuncs) {
      const fn = this.moreValidationFuncs[funcName].bind(this);
      this.predicates.push(
        (v) => v === undefined || v === null || fn(v, ...args),
      );
    }
    return this;
  }

  buildTotalPredicate() {
    return (value) => this.getAllPredicates().every((predFn) => predFn(value));
  }

  getAllPredicates() {
    const prerequisites = [this.constructor.getTypePredicate()];
    if (this.obligatory) {
      prerequisites.push(this.constructor.getRequiredPredicate());
    }
    return prerequisites.concat(this.predicates);
  }

  static getTypePredicate() {
    return () => true;
  }

  static getRequiredPredicate() {
    return (v) => v !== undefined && v !== null;
  }
}

export default Schema;
