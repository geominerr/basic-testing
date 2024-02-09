import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const base = { baseURL: 'https://jsonplaceholder.typicode.com' };
  const endpoint = '/users';
  const mockData = {
    data: [
      { uid: '26f8c6a5-7c18-bla-bla', name: 'Gary' },
      { uid: 'a1e0b5d9-82a5-bla-bla', name: 'John' },
      { uid: '4b27a85c-1b6e-bla-bla', name: 'Bam' },
    ],
  };

  beforeEach(() => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue(mockData) as jest.Mock;
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(endpoint);

    expect(axios.create).toHaveBeenCalledWith(base);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(endpoint);

    expect(axios.get).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    const responce = await throttledGetDataFromApi(endpoint);

    expect(responce).toBe(mockData.data);
  });
});
