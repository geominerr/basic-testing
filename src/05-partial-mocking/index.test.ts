import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    [mockOne, mockTwo, mockThree].forEach((fn) => {
      fn();

      expect(console.log).not.toHaveBeenCalled();
    });
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenCalled();
  });
});
