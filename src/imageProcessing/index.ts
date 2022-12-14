import express from 'express';
import url from './urls';
import {port} from './settings'


// create express app
const app = express();


// register urls
app.use(url);

//  register it as a view engine in express
app.set('view engine', 'pug');

// start server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
