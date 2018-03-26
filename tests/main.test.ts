import * as main from '../lib/main';

test('test add', () => {
  expect(main.add(1, -9)).toBe(-8);
});
