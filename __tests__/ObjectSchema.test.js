import Validator from '../src/Validator.js';

let validator;
let schema;

beforeAll(() => {
  validator = new Validator();
});

beforeEach(() => {
  schema = validator.object();
});

test('absent or empty', () => {
  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(Object.create(null))).toBe(true);
  expect(schema.isValid({})).toBe(true);
});

test('wrong type', () => {
  expect(schema.isValid(123)).toBe(false);
  expect(schema.isValid(123n)).toBe(false);
  expect(schema.isValid('str')).toBe(false);
  expect(schema.isValid(true)).toBe(false);
  expect(schema.isValid([1])).toBe(false);
  // eslint-disable-next-line no-array-constructor
  expect(schema.isValid(new Array(2))).toBe(false);
  expect(schema.isValid(Array.of(1, 2, 3))).toBe(false);
  expect(schema.isValid(Array.from({ length: 0 }))).toBe(false);
  expect(schema.isValid(() => {})).toBe(false);

  expect(schema.isValid({ k: 1 })).toBe(true);
});

test('required', () => {
  schema.required();

  expect(schema.isValid()).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(null)).toBe(false);

  expect(schema.isValid({})).toBe(true);
  expect(schema.isValid(Object.create(null))).toBe(true);
  expect(schema.isValid({ a: 1, b: true, c: 'str' })).toBe(true);
  expect(
    schema.isValid(
      Object.fromEntries([
        ['k1', 'v1'],
        ['k2', 'v2'],
      ]),
    ),
  ).toBe(true);
});

test('one shape', () => {
  schema.shape({
    name: validator.string().required(),
    age: validator.number().positive(),
  });

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(Object.create(null))).toBe(false);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid({ name: undefined })).toBe(false);
  expect(schema.isValid({ name: null })).toBe(false);
  expect(schema.isValid({ name: '' })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: -10 })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: 0 })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: NaN })).toBe(false);
  expect(schema.isValid({ age: 10 })).toBe(false);
  expect(schema.isValid({ name: undefined, age: 10 })).toBe(false);
  expect(schema.isValid({ name: null, age: 10 })).toBe(false);
  expect(schema.isValid({ name: '', age: 10 })).toBe(false);

  expect(schema.isValid({ name: ' ' })).toBe(true);
  expect(schema.isValid({ name: 'j' })).toBe(true);
  expect(schema.isValid({ name: 'jack' })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: undefined })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: null })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 0.1 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 1 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 10 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 1000 })).toBe(true);
});

test('empty shape', () => {
  schema.shape({});

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(Object.create(null))).toBe(true);
  expect(schema.isValid({})).toBe(true);
  expect(schema.isValid({ name: undefined })).toBe(true);
  expect(schema.isValid({ name: null })).toBe(true);
  expect(schema.isValid({ name: '' })).toBe(true);
  expect(schema.isValid({ name: ' ' })).toBe(true);
  expect(schema.isValid({ name: 'j' })).toBe(true);
  expect(schema.isValid({ name: 'jack' })).toBe(true);
});

test('two shapes', () => {
  schema
    .shape({ name: validator.string().required() })
    .shape({ age: validator.number().positive() });

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(Object.create(null))).toBe(false);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid({ name: undefined })).toBe(false);
  expect(schema.isValid({ name: null })).toBe(false);
  expect(schema.isValid({ name: '' })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: -10 })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: 0 })).toBe(false);
  expect(schema.isValid({ name: 'jack', age: NaN })).toBe(false);
  expect(schema.isValid({ age: 10 })).toBe(false);
  expect(schema.isValid({ name: undefined, age: 10 })).toBe(false);
  expect(schema.isValid({ name: null, age: 10 })).toBe(false);
  expect(schema.isValid({ name: '', age: 10 })).toBe(false);

  expect(schema.isValid({ name: ' ' })).toBe(true);
  expect(schema.isValid({ name: 'j' })).toBe(true);
  expect(schema.isValid({ name: 'jack' })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: undefined })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: null })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 0.1 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 1 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 10 })).toBe(true);
  expect(schema.isValid({ name: 'jack', age: 1000 })).toBe(true);
});

test('custom validation', () => {
  const v = new Validator();
  const customFn = (obj, key, value) => key in obj && obj[key] === value;
  v.addValidator('object', customFn.name, customFn);
  const objSchema = v.object().test(customFn.name, 'age', 25);

  expect(objSchema.isValid()).toBe(true);
  expect(objSchema.isValid(undefined)).toBe(true);
  expect(objSchema.isValid(null)).toBe(true);

  expect(objSchema.isValid(Object.create(null))).toBe(false);
  expect(objSchema.isValid({})).toBe(false);
  expect(objSchema.isValid('age')).toBe(false);
  expect(objSchema.isValid(25)).toBe(false);
  expect(objSchema.isValid({ age: undefined })).toBe(false);
  expect(objSchema.isValid({ age: null })).toBe(false);
  expect(objSchema.isValid({ age: '' })).toBe(false);
  expect(objSchema.isValid({ age: NaN })).toBe(false);
  expect(objSchema.isValid({ age: 0 })).toBe(false);
  expect(objSchema.isValid({ age: '25' })).toBe(false);
  expect(objSchema.isValid({ age: [25] })).toBe(false);
  expect(objSchema.isValid({ ages: 25 })).toBe(false);

  expect(objSchema.isValid({ age: 25 })).toBe(true);
  expect(objSchema.isValid({ name: 'jack', age: 25 })).toBe(true);
});
