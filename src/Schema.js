class Schema {
  constructor() {
    this.predicates = [];
    this.obligatory = false;
  }

  isValid(value) {
    const totalPredicate = this.buildTotalPredicate();
    return totalPredicate(value);
  }

  required() {
    this.obligatory = true;
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
