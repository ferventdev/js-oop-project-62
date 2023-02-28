/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
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

test('custom validation 1', () => {
  const v = new Validator();
  const customFn = (value, min) => value >= min;
  v.addValidator('number', customFn.name, customFn);
  const numSchema = v.number().test(customFn.name, 5);

  expect(numSchema.isValid()).toBe(true);
  expect(numSchema.isValid(undefined)).toBe(true);
  expect(numSchema.isValid(null)).toBe(true);

  expect(numSchema.isValid(NaN)).toBe(false);
  expect(numSchema.isValid(0)).toBe(false);
  expect(numSchema.isValid(-100)).toBe(false);
  expect(numSchema.isValid(3)).toBe(false);
  expect(numSchema.isValid(4.999)).toBe(false);

  expect(numSchema.isValid(5)).toBe(true);
  expect(numSchema.isValid(5.001)).toBe(true);
  expect(numSchema.isValid(Number.POSITIVE_INFINITY)).toBe(true);
});

test('custom validation 2', () => {
  const v = new Validator();
  const customFn = (val, lower, upper) => lower < val && val < upper;
  v.addValidator('number', customFn.name, customFn);
  const numSchema = v.number().test(customFn.name, -100, 100);

  expect(numSchema.isValid()).toBe(true);
  expect(numSchema.isValid(undefined)).toBe(true);
  expect(numSchema.isValid(null)).toBe(true);

  expect(numSchema.isValid(0)).toBe(true);
  expect(numSchema.isValid(-99.999)).toBe(true);
  expect(numSchema.isValid(99.999)).toBe(true);
  expect(numSchema.isValid(77)).toBe(true);

  expect(numSchema.isValid(-100)).toBe(false);
  expect(numSchema.isValid(100)).toBe(false);
  expect(numSchema.isValid(5000)).toBe(false);
  expect(numSchema.isValid(-333)).toBe(false);
  expect(numSchema.isValid(Number.MAX_SAFE_INTEGER)).toBe(false);
  expect(numSchema.isValid(Number.POSITIVE_INFINITY)).toBe(false);
  expect(numSchema.isValid(Number.MIN_SAFE_INTEGER)).toBe(false);
  expect(numSchema.isValid(Number.NEGATIVE_INFINITY)).toBe(false);
  expect(numSchema.isValid(NaN)).toBe(false);
});
