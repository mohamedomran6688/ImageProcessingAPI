import express from 'express';
import { formatUrlError } from '../errors';

// functions
const badUrl = (req: express.Request, res: express.Response): void => {
  res.status(400);
  res.send(formatUrlError);
};

const notFound = (req: express.Request, res: express.Response): void => {
  res.status(400);
  res.send('not found');
};

// export
export { badUrl, notFound };
