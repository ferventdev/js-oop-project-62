import Schema from './Schema.js';

class ArraySchema extends Schema {
  sizeof(len) {
    this.predicates.push(
      (v) => v === undefined || v === null || v.length === Math.max(0, len),
    );
    return this;
  }

  static getTypePredicate() {
    return (v) => v === undefined || v === null || Array.isArray(v);
  }

  static getRequiredPredicate() {
    return (v) => v !== undefined && v !== null;
  }
}

export default ArraySchema;
