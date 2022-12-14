import express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import {
  fullDirImages,
  fullDirResizeImages,
  renderFile,
  staticUrl,
  dirResizeImageHtml,
} from '../imageProcessing/settings';
import { createDir, dataFileName, sameNames } from './utilities/utilities';

// create Resize image if found
const createResize = (
  fullFileName: string,
  width: number,
  height: number,
  res: express.Response,
  files: string[]
) => {
  let fileName = '';
  files.forEach((file) => {
    if (sameNames(file, fullFileName)) {
      fileName = file;
    }
  });

  if (fileName) {
    const toFile = `${dataFileName(fileName)[0]}_${width}_${height}${
      dataFileName(fileName)[1]
    }`;
    sharp(path.join(fullDirImages, fileName))
      .resize(width, height)
      .toFile(path.join(fullDirResizeImages, toFile), () => {
        res.render(renderFile('resize.pug'), {
          dir: dirResizeImageHtml(toFile),
          staticUrl: staticUrl,
          file_name: fullFileName,
        });
      });
  } else {
    res.status(400);
    res.render(renderFile('resize.pug'), {
      dir: '',
      staticUrl: staticUrl,
      file_name: fullFileName,
    });
  }
};

// cache images Resize
const cacheResize = (
  fullFileName: string,
  width: number,
  height: number,
  res: express.Response,
  files: string[]
) => {
  let cached = false;
  files.forEach((file) => {
    if (sameNames(file, fullFileName)) {
      cached = true;
      res.render(renderFile('resize.pug'), {
        dir: dirResizeImageHtml(file),
        staticUrl: staticUrl,
        file_name: fullFileName,
      });
    }
  });
  if (!cached) {
    // if not found image in resize folder
    createDir(fullDirImages); // if directory not exists will create

    fs.readdir(fullDirImages, (err, files) => {
      createResize(fullFileName, width, height, res, files);
    });
  }
};

// export
export default cacheResize;
