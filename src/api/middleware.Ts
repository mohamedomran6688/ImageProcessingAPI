import express from 'express';
import matchResizeUrl from './utilities/regularExpressions';
import { formatUrlError } from '../errors';



// middleware to check url formating
const chckResizeUrl = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  if (matchResizeUrl(req.url)) next();
  else {
    res.status(400);
    res.send(formatUrlError);
  }
};


// export 
export default chckResizeUrl;
