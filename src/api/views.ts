import express from 'express';
import cacheResize from './resize';
import { createDir } from './utilities/utilities';
import { fullDirResizeImages } from '../imageProcessing/settings';
import fs from 'fs';

// functions
const resizeRequest = (req: express.Request, res: express.Response): void => {
  const file_name: string = req.query.file_name as string;
  const width: number = +(req.query.width as string) as number;
  const height: number = +(req.query.height as string) as number;

  createDir(fullDirResizeImages); // if directory not exists will create
  fs.readdir(fullDirResizeImages, (err, files) => {
    cacheResize(file_name, width, height, res, files);
  });
};

// export
export { resizeRequest };
