import express from 'express';
import chckResizeUrl from './middleware';
import { resizeRequest } from './views';
import { badUrl } from '../imageProcessing/views';

const routes = express.Router();

// handel resize request
routes.get('/resize', chckResizeUrl, resizeRequest);

// any url start with api/ and dont match format
routes.get('*', badUrl);

export default routes;
