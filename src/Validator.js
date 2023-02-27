/* eslint-disable class-methods-use-this */
import ArraySchema from './ArraySchema.js';
import NumberSchema from './NumberSchema.js';
import ObjectSchema from './ObjectSchema.js';
import StringSchema from './StringSchema.js';

class Validator {
  moreValidationFuncs = {
    string: {},
    number: {},
    array: {},
    object: {},
  };

  addValidator(type, name, fn) {
    if (type in this.moreValidationFuncs && typeof fn === 'function') {
      this.moreValidationFuncs[type][name] = fn;
    }
    return this;
  }

  string() {
    return new StringSchema(this.moreValidationFuncs.string);
  }

  number() {
    return new NumberSchema(this.moreValidationFuncs.number);
  }

  array() {
    return new ArraySchema(this.moreValidationFuncs.array);
  }

  object() {
    return new ObjectSchema(this.moreValidationFuncs.object);
  }
}

export default Validator;
