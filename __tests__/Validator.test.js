import Validator from '../src/Validator.js';

test('validator', () => {
  const v = new Validator();
  expect(v).not.toBeNull();
});
