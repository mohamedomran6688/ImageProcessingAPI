import express from 'express';

const formatUrlError =
  'plz the format url is ,api/resize?file_name={{file_name:string}}&width={{width:number}}&height={{height:number}},';

const errorCreateImage = 'error in create and save image';

const setNotFoundImageError = (
  res: express.Response,
  file_name: string
): void => {
  res.status(400);
  res.send(`the image named ${file_name} not found`); // if not found file by name
};
export { formatUrlError, setNotFoundImageError, errorCreateImage };
