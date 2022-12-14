import fs from 'fs';

// create direct if not exist
const createDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// return data from full file name
const dataFileName = (fullFileName: string) => {
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
const sameNames = (fileFullName1: string, fileFullName2: string) => {
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
export { createDir, dataFileName, sameNames };
