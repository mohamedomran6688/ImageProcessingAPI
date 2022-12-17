import express from 'express';
import chckResizeUrl from './middleware';
import { resizeRequest } from './views';
import { badUrl } from '../imageProcessing/views';

const routes = express.Router();

// handel resize request
routes.get('/resize', chckResizeUrl, resizeRequest); // as requested from the first review

// any url start with api/ and dont match format
routes.get('*', badUrl);

export default routes;
