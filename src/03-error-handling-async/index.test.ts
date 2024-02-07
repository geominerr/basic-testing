import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const res = 'Hello world';
    const value = await resolveValue(res);

    expect(value).toBe(res);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Error message';

    expect(() => throwError(message)).toThrowError(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const res = 'Oops!';

    expect(() => throwError()).toThrowError(res);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
