import { objects, typesQuery } from '../../imageProcessing/settings';
//
const checkRegExp = (value: string, re: RegExp): boolean => {
  const matchArry: RegExpMatchArray | null = value.match(re);
  if (matchArry === null) return false;
  if (value !== matchArry[0]) return false;
  return true;
};

// check url is match with re or not
const matchResizeUrl = (url: string): boolean => {
  const re =
    /\/resize(\/*?)\?file_name=([-a-zA-Z0-9_.]*)&width=([0-9]*)&height=([0-9]*)/;
  return checkRegExp(url, re);
};

const typeInput: objects = {
  [typesQuery.int]: /[0-9]*/,
  [typesQuery.str]: /([-a-zA-Z0-9_.]*)/,
};

const checkValidationValue = (value: string, type: typesQuery): boolean => {
  return checkRegExp(value, typeInput[type]);
};

export { matchResizeUrl, checkValidationValue };
