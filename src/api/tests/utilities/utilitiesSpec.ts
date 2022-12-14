import { dataFileName, sameNames } from '../../utilities/utilities';

it('test dataFileName', () => {
  expect(dataFileName('test.ts')).toEqual(['test', '.ts']);
  expect(dataFileName('test.ts.js')).toEqual(['test.ts', '.js']);
  expect(dataFileName('test')).toEqual(['test', '']);
});

it('test sameNames', () => {
  expect(sameNames('test.ts', 'test')).toEqual(true);
  expect(sameNames('test.ts.js', 'test.ts')).toEqual(false);
  expect(sameNames('test', 'test')).toEqual(true);
  expect(sameNames('test', 'test.js')).toEqual(true);
  expect(sameNames('test.ts', 'test.js')).toEqual(false);
});
