import ArraySchema from '../src/ArraySchema.js';
import NumberSchema from '../src/NumberSchema.js';
import ObjectSchema from '../src/ObjectSchema.js';
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

  const arraySchema = v.array();
  expect(arraySchema).not.toBeNull();
  expect(arraySchema).toBeInstanceOf(ArraySchema);
  expect(arraySchema).toBeInstanceOf(Schema);

  const objectSchema = v.object();
  expect(objectSchema).not.toBeNull();
  expect(objectSchema).toBeInstanceOf(ObjectSchema);
  expect(objectSchema).toBeInstanceOf(Schema);
});
