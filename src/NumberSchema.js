import Schema from './Schema.js';

class NumberSchema extends Schema {
  positive() {
    this.predicates.push((v) => v === undefined || v === null || v > 0);
    return this;
  }

  range(lower, upper = Number.POSITIVE_INFINITY) {
    this.predicates.push(
      (v) => v === undefined || v === null || (lower <= v && v <= upper),
    );
    return this;
  }

  static getTypePredicate() {
    return (v) => v === undefined || v === null || typeof v === 'number';
  }

  static getRequiredPredicate() {
    return (v) => v !== undefined && v !== null;
  }
}

export default NumberSchema;
