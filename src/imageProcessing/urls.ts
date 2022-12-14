import express from 'express';
import api from '../api/urls';
import { badUrl, notFound } from './views';
import { staticApp, staticUrl } from './settings';

// create new routes
const routes = express.Router();

// register static files like image , css , js , files
routes.use(staticUrl, staticApp);

// register api app
routes.use('/api', api);

// any url start with staticUrl but file not found
routes.get('/static/*', notFound);

// any url dont start with api/ or static
routes.get('*', badUrl);

export default routes;
