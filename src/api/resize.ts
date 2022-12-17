import express from 'express';
import fs from 'fs';
import path from 'path';
import {
  fullDirImages,
  renderFile,
  staticUrl,
  dirResizeImageHtml,
  fullDirResizeImages,
} from '../imageProcessing/settings';
import {
  createDir,
  dataFileName,
  sameNames,
  resizeImage,
} from './utilities/utilities';
import { setNotFoundImageError } from '../errors';
// create Resize image if found
const createResize = (
  fullFileName: string,
  width: number,
  height: number,
  res: express.Response,
  files: string[]
): void => {
  // as requested from the first review
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
    resizeImage(
      path.join(fullDirImages, fileName),
      width,
      height,
      path.join(fullDirResizeImages, toFile)
    )
      .then((): void => {
        res.render(renderFile('resize.pug'), {
          dir: dirResizeImageHtml(toFile),
          staticUrl: staticUrl,
          file_name: fullFileName,
        });
      })
      .catch((err: Error): void => {
        res.status(400);
        res.send(err);
      });
  } else {
    setNotFoundImageError(res, fullFileName); // if not found file by name
  }
};

// cache images Resize
const cacheResize = (
  fullFileName: string,
  width: number,
  height: number,
  res: express.Response,
  files: string[]
): void => {
  // as requested from the first review
  const [file_name, extention] = dataFileName(fullFileName);
  let cached = false;
  files.forEach((file) => {
    if (sameNames(file, `${file_name}_${width}_${height}${extention}`)) {
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
