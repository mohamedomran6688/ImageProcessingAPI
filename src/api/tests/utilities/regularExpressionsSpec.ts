import {
  matchResizeUrl,
  checkValidationValue,
} from '../../utilities/regularExpressions';
import { typesQuery } from '../../../imageProcessing/settings';

// erro format url
it('matchResizeUrl("/resize" to equal false', () => {
  expect(matchResizeUrl('/resize')).toEqual(false);
});

//with extension file
it('matchResizeUrl("/resize/?file_name=1&width=100&height=500" to equal true', () => {
  expect(
    matchResizeUrl('/resize?file_name=1.jpg&width=100&height=500')
  ).toEqual(true);
});

//without extension file
it('matchResizeUrl("/resize/?file_name=1&width=100&height=500" to equal true', () => {
  expect(matchResizeUrl('/resize/?file_name=1&width=100&height=500')).toEqual(
    true
  );
});

//check number
it('checkValidationValue("20s0","int") to equal true', () => {
  expect(checkValidationValue('20s0', typesQuery.int)).toEqual(false);
});

//check number
it('checkValidationValue("200","int") to equal true', () => {
  expect(checkValidationValue('200', typesQuery.int)).toEqual(true);
});

//check number
it('checkValidationValue("test.png","str") to equal true', () => {
  expect(checkValidationValue('test.png', typesQuery.str)).toEqual(true);
});
