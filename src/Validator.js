/* eslint-disable class-methods-use-this */
import NumberSchema from './NumberSchema.js';
import StringSchema from './StringSchema.js';

class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }
}

export default Validator;
