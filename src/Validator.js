/* eslint-disable class-methods-use-this */
import ArraySchema from './ArraySchema.js';
import NumberSchema from './NumberSchema.js';
import StringSchema from './StringSchema.js';

class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }

  array() {
    return new ArraySchema();
  }
}

export default Validator;
