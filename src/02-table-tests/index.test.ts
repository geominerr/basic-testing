import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 18, b: 3, action: Action.Divide, expected: 6 },
  { a: 24, b: 4, action: Action.Divide, expected: 6 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 4, action: Action.Exponentiate, expected: 625 },
  { a: 5, b: 2, action: '&', expected: null },
  { a: 5, b: 3, action: '$', expected: null },
  { a: 5, b: 4, action: '%', expected: null },
  { a: 'string', b: 2, action: Action.Exponentiate, expected: null },
  { a: undefined, b: 3, action: Action.Divide, expected: null },
  { a: {}, b: 4, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should correctly calculate the result for case: $a $action $b = $expected',
    ({ expected, ...rawInput }) => {
      expect(simpleCalculator(rawInput)).toBe(expected);
    },
  );
});
