import Schema from './Schema.js';

function isObjectOrNull(value) {
  return typeof value === 'object' && !Array.isArray(value);
}

class ObjectSchema extends Schema {
  // prettier-ignore
  shape(obj) {
    const isShapeInvalid = obj === undefined || obj === null || !isObjectOrNull(obj);
    if (isShapeInvalid) return this;

    const shapeProps = Object.entries(obj).filter(([, schema]) => schema instanceof Schema);
    if (shapeProps.length > 0) {
      this.predicates.push(
        (v) => v === undefined || v === null
          || shapeProps.every(([key, schema]) => schema.isValid(v[key])),
      );
    }
    return this;
  }

  static getTypePredicate() {
    return (v) => v === undefined || isObjectOrNull(v);
  }

  static getRequiredPredicate() {
    return (v) => v !== undefined && v !== null;
  }
}

export default ObjectSchema;
