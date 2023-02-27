import Validator from '../src/Validator.js';

let validator;
let schema;

beforeAll(() => {
  validator = new Validator();
});

beforeEach(() => {
  schema = validator.string();
});

test('absent', () => {
  expect(schema.isValid()).toBe(true);
  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid('')).toBe(true);
});

test('wrong type', () => {
  expect(schema.isValid(123)).toBe(false);
  expect(schema.isValid(false)).toBe(false);
  expect(schema.isValid({})).toBe(false);
  expect(schema.isValid(Object.create(null))).toBe(false);
  expect(schema.isValid([])).toBe(false);

  expect(schema.isValid('smth')).toBe(true);
});

test('required', () => {
  schema.required();

  expect(schema.isValid()).toBe(false);
  expect(schema.isValid(undefined)).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid('')).toBe(false);

  expect(schema.isValid('smth')).toBe(true);
});

test('simple contains', () => {
  schema.contains('what');

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid('what does the fox say')).toBe(true);

  expect(schema.isValid('does the fox say')).toBe(false);
  expect(schema.isValid('')).toBe(false);
});

test('double contains', () => {
  schema.contains('what').contains('fox');

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid('what does the fox say')).toBe(true);

  expect(schema.isValid('what does say')).toBe(false);
  expect(schema.isValid('does the fox say')).toBe(false);
  expect(schema.isValid('')).toBe(false);
});

test('min length = 1', () => {
  schema.minLength(1);

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid(' ')).toBe(true);
  expect(schema.isValid('smth')).toBe(true);

  expect(schema.isValid('')).toBe(false);
});

test('min length > 1', () => {
  schema.minLength(3);

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid('---')).toBe(true);
  expect(schema.isValid('smth')).toBe(true);

  expect(schema.isValid('')).toBe(false);
  expect(schema.isValid(' ')).toBe(false);
  expect(schema.isValid('--')).toBe(false);
});

test('min length < 0', () => {
  schema.minLength(-10);

  expect(schema.isValid(undefined)).toBe(true);
  expect(schema.isValid(null)).toBe(true);

  expect(schema.isValid('')).toBe(true);
  expect(schema.isValid(' ')).toBe(true);
  expect(schema.isValid('smth')).toBe(true);
});

test('custom validation', () => {
  const v = new Validator();
  const customFn = (value, start) => value.startsWith(start);
  v.addValidator('string', customFn.name, customFn);
  const strSchema = v.string().test(customFn.name, 'H');

  expect(strSchema.isValid()).toBe(true);
  expect(strSchema.isValid(undefined)).toBe(true);
  expect(strSchema.isValid(null)).toBe(true);

  expect(strSchema.isValid('')).toBe(false);
  expect(strSchema.isValid(' ')).toBe(false);
  expect(strSchema.isValid('smth')).toBe(false);
  expect(strSchema.isValid('hello')).toBe(false);
  expect(strSchema.isValid(' Hello')).toBe(false);

  expect(strSchema.isValid('H')).toBe(true);
  expect(strSchema.isValid('Hello')).toBe(true);
});
