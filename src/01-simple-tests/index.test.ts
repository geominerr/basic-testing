import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = 4;
    const inputRaw = {
      a: 2,
      b: 2,
      action: Action.Add,
    };

    expect(simpleCalculator(inputRaw)).toBe(res);
  });

  test('should subtract two numbers', () => {
    const res = 50;
    const inputRaw = {
      a: 100,
      b: 50,
      action: Action.Subtract,
    };

    expect(simpleCalculator(inputRaw)).toBe(res);
  });

  test('should multiply two numbers', () => {
    const res = 625;
    const inputRaw = {
      a: 25,
      b: 25,
      action: Action.Multiply,
    };

    expect(simpleCalculator(inputRaw)).toBe(res);
  });

  test('should divide two numbers', () => {
    const res = 25;
    const inputRaw = {
      a: 250,
      b: 10,
      action: Action.Divide,
    };

    expect(simpleCalculator(inputRaw)).toBe(res);
  });

  test('should exponentiate two numbers', () => {
    const res = 27;
    const inputRaw = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    };

    expect(simpleCalculator(inputRaw)).toBe(res);
  });

  test('should return null for invalid action', () => {
    const inputRaw = {
      a: 2,
      b: 2,
      action: '?',
    };

    expect(simpleCalculator(inputRaw)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const inputRaw = {
      a: '2',
      b: 2,
      action: Action.Add,
    };

    expect(simpleCalculator(inputRaw)).toBeNull();
  });
});
