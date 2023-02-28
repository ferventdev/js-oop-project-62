/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import ArraySchema from '../src/ArraySchema.js';
import NumberSchema from '../src/NumberSchema.js';
import ObjectSchema from '../src/ObjectSchema.js';
import Schema from '../src/Schema.js';
import StringSchema from '../src/StringSchema.js';
import Validator from '../src/Validator.js';

test('validation schemas', () => {
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

test('add good validators', () => {
  const v = new Validator();
  const someFunc = () => true;

  v.addValidator('string', someFunc.name, someFunc);
  v.addValidator('number', someFunc.name, someFunc);
  v.addValidator('array', someFunc.name, someFunc);
  v.addValidator('object', someFunc.name, someFunc);

  expect(v.moreValidationFuncs.string).toHaveProperty(someFunc.name, someFunc);
  expect(v.moreValidationFuncs.number).toHaveProperty(someFunc.name, someFunc);
  expect(v.moreValidationFuncs.array).toHaveProperty(someFunc.name, someFunc);
  expect(v.moreValidationFuncs.object).toHaveProperty(someFunc.name, someFunc);

  expect(v.string().moreValidationFuncs).toHaveProperty(
    someFunc.name,
    someFunc,
  );
  expect(v.number().moreValidationFuncs).toHaveProperty(
    someFunc.name,
    someFunc,
  );
  expect(v.array().moreValidationFuncs).toHaveProperty(someFunc.name, someFunc);
  expect(v.object().moreValidationFuncs).toHaveProperty(
    someFunc.name,
    someFunc,
  );
});

test('add wrong validator', () => {
  const v = new Validator();

  const wrongTypeKey = 'wrong';
  const someFunc = () => true;
  v.addValidator(wrongTypeKey, someFunc.name, someFunc);

  expect(v.moreValidationFuncs).not.toHaveProperty(wrongTypeKey);

  v.addValidator('string', someFunc.name, 'notAFunction');

  expect(v.moreValidationFuncs.string).not.toHaveProperty(someFunc.name);
});
