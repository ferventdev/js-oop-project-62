import Validator from '../src/Validator.js';

let validator;
let schema;

beforeAll(() => {
  validator = new Validator();
});

beforeEach(() => {
  schema = validator.number();
});

test('absent or NaN', () => {
  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid(NaN)).toBe(true);
});

test('wrong type', () => {
  expect(schema.isValid('123')).toBe(false);
  expect(schema.isValid(false)).toBe(false);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid(Object.create(null))).toBe(false);
  expect(schema.isValid([])).toBe(false);
  expect(schema.isValid(123n)).toBe(false);

  expect(schema.isValid(123)).toBe(true);
});

test('required', () => {
  schema.required();

  expect(schema.isValid()).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(null)).toBe(false);

  expect(schema.isValid(NaN)).toBe(true);
  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(123)).toBe(true);
  expect(schema.isValid(-777)).toBe(true);
  expect(schema.isValid(123.456)).toBe(true);
  expect(schema.isValid(Number.MAX_SAFE_INTEGER)).toBe(true);
  expect(schema.isValid(Number.POSITIVE_INFINITY)).toBe(true);
  expect(schema.isValid(Number.MIN_SAFE_INTEGER)).toBe(true);
  expect(schema.isValid(Number.NEGATIVE_INFINITY)).toBe(true);
});

test('positive', () => {
  schema.positive();

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(0.01)).toBe(true);
  expect(schema.isValid(100)).toBe(true);
  expect(schema.isValid(Number.MAX_SAFE_INTEGER)).toBe(true);
  expect(schema.isValid(Number.POSITIVE_INFINITY)).toBe(true);

  expect(schema.isValid(0)).toBe(false);
  expect(schema.isValid(-0.01)).toBe(false);
  expect(schema.isValid(-100)).toBe(false);
  expect(schema.isValid(Number.MIN_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});

test('full range', () => {
  schema.range(-100, 100);

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(-100)).toBe(true);
  expect(schema.isValid(100)).toBe(true);
  expect(schema.isValid(77)).toBe(true);

  expect(schema.isValid(-100.01)).toBe(false);
  expect(schema.isValid(100.01)).toBe(false);
  expect(schema.isValid(5000)).toBe(false);
  expect(schema.isValid(-333)).toBe(false);
  expect(schema.isValid(Number.MAX_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.POSITIVE_INFINITY)).toBe(false);
  expect(schema.isValid(Number.MIN_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});

test('half range', () => {
  schema.range(-100);

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(-100)).toBe(true);
  expect(schema.isValid(100)).toBe(true);
  expect(schema.isValid(100.01)).toBe(true);
  expect(schema.isValid(10000)).toBe(true);
  expect(schema.isValid(Number.MAX_SAFE_INTEGER)).toBe(true);
  expect(schema.isValid(Number.POSITIVE_INFINITY)).toBe(true);

  expect(schema.isValid(-100.01)).toBe(false);
  expect(schema.isValid(-333)).toBe(false);
  expect(schema.isValid(Number.MIN_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});

test('full range & positive', () => {
  schema.range(-100, 100).positive();

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(0.01)).toBe(true);
  expect(schema.isValid(100)).toBe(true);
  expect(schema.isValid(77)).toBe(true);

  expect(schema.isValid(0)).toBe(false);
  expect(schema.isValid(-0.01)).toBe(false);

  expect(schema.isValid(-100)).toBe(false);
  expect(schema.isValid(-100.01)).toBe(false);
  expect(schema.isValid(100.01)).toBe(false);
  expect(schema.isValid(5000)).toBe(false);
  expect(schema.isValid(-333)).toBe(false);
  expect(schema.isValid(Number.MAX_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.POSITIVE_INFINITY)).toBe(false);
  expect(schema.isValid(Number.MIN_SAFE_INTEGER)).toBe(false);
  expect(schema.isValid(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(schema.isValid(NaN)).toBe(false);
});
