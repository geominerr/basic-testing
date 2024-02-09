import fs from 'fs';
import path from 'path';
import * as fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutMock).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    const setIntervalMock = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setIntervalMock).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 100;

    doStuffByInterval(callback, timeout);

    new Array(5).fill(1).forEach((__, index) => {
      expect(callback).toHaveBeenCalledTimes(index);
      jest.advanceTimersByTime(timeout);
    });
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');
    const pathToFile = 'testPath/rss_school';

    await readFileAsynchronously(pathToFile);

    expect(joinMock).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pathToFile = 'testPath/rss_school';

    const result = await readFileAsynchronously(pathToFile);

    expect(existSyncMock).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Hello world!';
    const pathToFile = 'testPath/rss_school';
    const existSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(fileContent as never);

    const res = await readFileAsynchronously(pathToFile);

    expect(existSyncMock).toHaveBeenCalled();
    expect(readFileMock).toHaveBeenCalled();
    expect(res).toBe(fileContent);
  });
});
