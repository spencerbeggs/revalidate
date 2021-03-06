// @flow
import unconfigured from '../../src/validators/isNumeric';

const FIELD = 'FOO';
const isNumeric = unconfigured(FIELD);
const expectedErrorMessage = `${FIELD} must be numeric`;

it('allows numeric digits', () => {
  const digits = '0123456789';

  expect(isNumeric(digits)).toBe(undefined);
});

it('does not allow letters', () => {
  const letters = (
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  );

  letters.forEach(letter => {
    expect(isNumeric(letter)).toBe(expectedErrorMessage);
    expect(isNumeric(`${letter}1`)).toBe(expectedErrorMessage);
  });
});

it('does not allow other characters', () => {
  const chars = '!@#$%^&*()-_+=~`[]{}\\|:;"\',.<>?/ '.split('');

  chars.forEach(c => {
    expect(isNumeric(c)).toBe(expectedErrorMessage);
    expect(isNumeric(`${c}1`)).toBe(expectedErrorMessage);
  });
});

it('is cloneable', () => {
  const cloned = unconfigured.clone(field => `${field} error`)(FIELD);
  const expected = `${FIELD} error`;

  expect(cloned('a')).toBe(expected);
});
