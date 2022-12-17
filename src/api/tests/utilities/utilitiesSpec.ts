import {
  dataFileName,
  sameNames,
  resizeImage,
  getKeyValue,
} from '../../utilities/utilities';
import path from 'path';
import {
  fullDirImages,
  fullDirResizeImages,
} from '../../../imageProcessing/settings';
import { errorCreateImage } from '../../../errors';

it('test dataFileName', () => {
  expect(dataFileName('test.ts')).toEqual(['test', '.ts']);
  expect(dataFileName('test.ts.js')).toEqual(['test.ts', '.js']);
  expect(dataFileName('test')).toEqual(['test', '']);
});

// test sameNames
it('test sameNames', () => {
  expect(sameNames('test.ts', 'test')).toEqual(true);
  expect(sameNames('test.ts.js', 'test.ts')).toEqual(false);
  expect(sameNames('test', 'test')).toEqual(true);
  expect(sameNames('test', 'test.js')).toEqual(true);
  expect(sameNames('test.ts', 'test.js')).toEqual(false);
});

// test getKeyValue
it('test getKeyValue', () => {
  expect(getKeyValue({ a: 1, b: 2 }, 'a', null)).toEqual(1);
  expect(getKeyValue({ a: 1, b: 2 }, 'b', null)).toEqual(2);
  expect(getKeyValue({ a: 1, b: 2 }, 'c', null)).toEqual(null);
});

// test resizeImage

// test with image dont exist
it('test resizeImage', (done) => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  const file_name = 'fjord1.jpg';
  const width = 100;
  const height = 200;
  const toFile = `${dataFileName(file_name)[0]}_${width}_${height}${
    dataFileName(file_name)[1]
  }`;

  resizeImage(
    path.join(fullDirImages, file_name),
    100,
    200,
    path.join(fullDirResizeImages, toFile)
  ).catch((error) => {
    expect(error).toEqual(errorCreateImage);
    done();
  });
});

// test with exist image
it('test resizeImage', (done) => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  const file_name = 'fjord.jpg';
  const width = 100;
  const height = 200;
  const toFile = `${dataFileName(file_name)[0]}_${width}_${height}${
    dataFileName(file_name)[1]
  }`;
  resizeImage(
    path.join(fullDirImages, file_name),
    100,
    200,
    path.join(fullDirResizeImages, toFile)
  ).then((res) => {
    expect(res).toEqual('done');
    done();
  });
});
