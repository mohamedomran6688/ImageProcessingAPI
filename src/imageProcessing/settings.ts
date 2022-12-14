import express from 'express';
import path from 'path';

// settings
const port = 3000; // The server will listen on port
const staticUrl = '/static/';
const dirStatic = 'src/static/'; // it must contain dirResizeImages
const dirTemplate = 'src/template/';
const dirImages = 'src/images/full/'; // note if this dont exist will create
const dirResizeImages = 'src/static/imgs/imagesResize/'; // note if this dont exist will create

// static
const staticApp = express.static(path.join(process.cwd(), dirStatic));

// template
const renderFile = (files_name: string): string => {
  return path.join(process.cwd(), dirTemplate, files_name);
};

// images full directory
const fullDirImages = path.join(process.cwd(), dirImages);

// Resize images full directory
const fullDirResizeImages = path.join(process.cwd(), dirResizeImages);

// get Resize images directory to html files
const dirResizeImageHtml = (imgName: string): string =>
  dirResizeImages.replace(dirStatic, '') + imgName;

// export
export {
  port,
  staticUrl,
  staticApp,
  renderFile,
  fullDirImages,
  fullDirResizeImages,
  dirResizeImageHtml,
};
