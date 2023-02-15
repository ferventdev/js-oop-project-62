import NumberSchema from '../src/NumberSchema.js';
import Schema from '../src/Schema.js';
import StringSchema from '../src/StringSchema.js';
import Validator from '../src/Validator.js';

test('validator', () => {
  const v = new Validator();
  expect(v).not.toBeNull();

  const stringSchema = v.string();
  expect(stringSchema).not.toBeNull();
  expect(stringSchema).toBeInstanceOf(StringSchema);
  expect(stringSchema).toBeInstanceOf(Schema);

  const numberSchema = v.number();
  expect(numberSchema).not.toBeNull();
  expect(numberSchema).toBeInstanceOf(NumberSchema);
  expect(numberSchema).toBeInstanceOf(Schema);
});
