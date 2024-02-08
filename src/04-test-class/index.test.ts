import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from './index';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const excessTransferAmount = initialBalance + 100;

    expect(() => account.withdraw(excessTransferAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const excessTransferAmount = initialBalance + 100;
    const secondAccount = getBankAccount(initialBalance);

    expect(() =>
      account.transfer(excessTransferAmount, secondAccount),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = initialBalance - 100;

    expect(() => account.transfer(transferAmount, account)).toThrow();
  });

  test('should deposit money', () => {
    const depositAmount = 500;
    const newBalance = initialBalance + depositAmount;

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 500;
    const newBalance = initialBalance - withdrawAmount;

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const transferAmount = 500;
    const sourceBalance = initialBalance - transferAmount;
    const transferredBalance = initialBalance + transferAmount;
    const secondAccount = getBankAccount(initialBalance);

    account.transfer(transferAmount, secondAccount);

    expect(account.getBalance()).toBe(sourceBalance);
    expect(secondAccount.getBalance()).toBe(transferredBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const correctType = 'number';
    const balance = await account.fetchBalance();

    if (balance !== null) {
      const type = typeof balance;

      return expect(type).toBe(correctType);
    }

    expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedBalance = 777;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(fetchedBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchedBalance = null;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(fetchedBalance);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
