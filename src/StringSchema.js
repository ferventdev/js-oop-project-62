import Schema from './Schema.js';

class StringSchema extends Schema {
  contains(str) {
    this.predicates.push(
      (v) => v === undefined || v === null || v.includes(str),
    );
    return this;
  }

  minLength(len = 0) {
    this.predicates.push(
      (v) => v === undefined || v === null || v.length >= Math.max(0, len),
    );
    return this;
  }

  static getTypePredicate() {
    return (v) => v === undefined || v === null || typeof v === 'string';
  }

  static getRequiredPredicate() {
    return (v) => v !== undefined && v !== null && v !== '';
  }
}

export default StringSchema;
