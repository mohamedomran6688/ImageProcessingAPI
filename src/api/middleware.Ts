import express from 'express';
import {
  matchResizeUrl,
  checkValidationValue,
} from './utilities/regularExpressions';
import { getKeyValue } from './utilities/utilities';
import { objects, typesQuery } from '../imageProcessing/settings';

// middleware to check url formating
const chckResizeUrl = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  if (matchResizeUrl(req.url)) {
    next();
  } else {
    // if the url is not in the formatting it will show the wrong
    let errorMessage = '';

    const parameters: objects = {
      file_name: typesQuery.str,
      width: typesQuery.int,
      height: typesQuery.int,
    };

    Object.keys(parameters).forEach((key: string): void => {
      if (getKeyValue(req.query, key, '') === '') {
        errorMessage += `, Missing ${key}`;
      } else {
        if (
          !checkValidationValue(
            getKeyValue(req.query, key, ''),
            parameters[key]
          )
        ) {
          errorMessage += `, Invalid input for ${key}`;
        }
      }
    });

    res.status(400);
    res.send(errorMessage);
  }
};

// export
export default chckResizeUrl;
