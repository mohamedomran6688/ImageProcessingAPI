import fs from 'fs';
import { objects } from '../../imageProcessing/settings';
import sharp from 'sharp';
import { errorCreateImage } from '../../errors';

// create direct if not exist
const createDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// return data from full file name
const dataFileName = (fullFileName: string): [string, string] => {
  // get file name wihout extention from full file name
  if (!fullFileName.includes('.')) return [fullFileName, ''];
  const file_name: string = fullFileName.substr(
    0,
    fullFileName.lastIndexOf('.')
  );
  // get extension from full file name
  const extension: string = fullFileName.slice(
    fullFileName.lastIndexOf('.'),
    fullFileName.length
  );
  return [file_name, extension];
};

// return true if the two files name the same name ..... ignore extensions if anyfile without extension
const sameNames = (fileFullName1: string, fileFullName2: string): boolean => {
  const [[file_name1, extension1], [file_name2, extension2]] = [
    dataFileName(fileFullName1),
    dataFileName(fileFullName2),
  ];
  if (extension1 && extension2) {
    if (file_name1 == file_name2 && extension1 == extension2) {
      return true;
    }
  } else {
    if (file_name1 == file_name2) {
      return true;
    }
  }
  return false;
};

// return the value of key object or back
const getKeyValue = (obj: objects, key: string, back: any = null): any => {
  if (key in obj) {
    return obj[key];
  }
  return back;
};

// sharp images
const resizeImage = (
  dir: string,
  width: number,
  height: number,
  toFile: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    sharp(dir)
      .resize(width, height)
      .toFile(toFile, (err: Error) => {
        if (err) reject(errorCreateImage);
        else resolve('done');
      });
  });
};
export { createDir, dataFileName, sameNames, getKeyValue, resizeImage };
