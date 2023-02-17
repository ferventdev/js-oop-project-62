import Validator from '../src/Validator.js';

let validator;
let schema;

beforeAll(() => {
  validator = new Validator();
});

beforeEach(() => {
  schema = validator.array();
});

test('absent or empty', () => {
  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid([])).toBe(true);
  // eslint-disable-next-line no-array-constructor
  expect(schema.isValid(new Array())).toBe(true);
  expect(schema.isValid(new Array(0))).toBe(true);
  expect(schema.isValid(Array.of())).toBe(true);
  expect(schema.isValid(Array.from({ length: 0 }))).toBe(true);
});

test('wrong type', () => {
  expect(schema.isValid(123)).toBe(false);
  expect(schema.isValid(123n)).toBe(false);
  expect(schema.isValid('123')).toBe(false);
  expect(schema.isValid(false)).toBe(false);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid(Object.create(null))).toBe(false);
  expect(schema.isValid({ __proto__: Array.prototype })).toBe(false);
  expect(schema.isValid({ length: 0 })).toBe(false);
  expect(schema.isValid({ constructor: Array })).toBe(false);

  expect(schema.isValid([])).toBe(true);
});

test('required', () => {
  schema.required();

  expect(schema.isValid()).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(null)).toBe(false);

  expect(schema.isValid([])).toBe(true);
  expect(schema.isValid([1])).toBe(true);
  expect(schema.isValid([1, 2])).toBe(true);
  expect(schema.isValid(Array.of())).toBe(true);
  expect(schema.isValid(Array.of(1))).toBe(true);
  // eslint-disable-next-line no-array-constructor
  expect(schema.isValid(new Array())).toBe(true);
  expect(schema.isValid(new Array(0))).toBe(true);
  expect(schema.isValid(new Array(1))).toBe(true);
  expect(schema.isValid(Array.from({ length: 0 }))).toBe(true);
});

test('sizeof > 0', () => {
  schema.sizeof(2);

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid([1, 2])).toBe(true);
  expect(schema.isValid(new Array(2))).toBe(true);
  expect(schema.isValid(Array.from({ length: 2 }))).toBe(true);
  expect(schema.isValid(Array.of(1, 2))).toBe(true);

  expect(schema.isValid([])).toBe(false);
  expect(schema.isValid([1])).toBe(false);
  expect(schema.isValid([1, 2, 3])).toBe(false);
  expect(schema.isValid(new Array(1))).toBe(false);
  expect(schema.isValid(new Array(5))).toBe(false);
  expect(schema.isValid(Array.of())).toBe(false);
  expect(schema.isValid(Array.of(1))).toBe(false);
  expect(schema.isValid(Array.of(1, 2, 3))).toBe(false);
  expect(schema.isValid(Array.from({ length: 1 }))).toBe(false);
  expect(schema.isValid(Array.from({ length: 3 }))).toBe(false);
});

test('sizeof = 0', () => {
  schema.sizeof(0);

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid([])).toBe(true);
  // eslint-disable-next-line no-array-constructor
  expect(schema.isValid(new Array())).toBe(true);
  expect(schema.isValid(new Array(0))).toBe(true);
  expect(schema.isValid(Array.of())).toBe(true);
  expect(schema.isValid(Array.from({ length: 0 }))).toBe(true);

  expect(schema.isValid([1])).toBe(false);
  expect(schema.isValid([1, 2, 3])).toBe(false);
  expect(schema.isValid(new Array(1))).toBe(false);
  expect(schema.isValid(Array.of(1))).toBe(false);
  expect(schema.isValid(Array.of(1, 2, 3))).toBe(false);
  expect(schema.isValid(Array.from({ length: 1 }))).toBe(false);
});

test('sizeof < 0', () => {
  schema.sizeof(-10);

  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid([])).toBe(true);
  // eslint-disable-next-line no-array-constructor
  expect(schema.isValid(new Array())).toBe(true);
  expect(schema.isValid(new Array(0))).toBe(true);
  expect(schema.isValid(Array.of())).toBe(true);
  expect(schema.isValid(Array.from({ length: 0 }))).toBe(true);

  expect(schema.isValid([1])).toBe(false);
  expect(schema.isValid([1, 2, 3])).toBe(false);
  expect(schema.isValid(new Array(1))).toBe(false);
  expect(schema.isValid(Array.of(1))).toBe(false);
  expect(schema.isValid(Array.of(1, 2, 3))).toBe(false);
  expect(schema.isValid(Array.from({ length: 1 }))).toBe(false);
});
