import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const equalList = { value: 'value1', next: { value: null, next: null } };
    const list = ['value1'];
    const linkedList = generateLinkedList(list);

    expect(linkedList).toStrictEqual(equalList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = ['value1', 'value2'];
    const linkedList = generateLinkedList(list);

    console.log('LIST', linkedList);

    expect(linkedList).toMatchSnapshot();
  });
});
