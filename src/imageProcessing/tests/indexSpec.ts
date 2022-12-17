import supertest from 'supertest';
import app from '../index';
import { formatUrlError } from '../../errors';
import { renderFile, dirResizeImageHtml, staticUrl } from '../settings';
import fs from 'fs';
const request = supertest(app);
// error formate url
describe('Test endpoint responses /api', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(400);
    expect(response.text).toBe(formatUrlError);
  });
});

// error formate url
describe('Test endpoint responses /api/resize?file_name=2.png&width=300&height=2-00', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/resize?file_name=2.png&width=300&height=2-00'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe(', Invalid input for height');
  });
});

// error formate url
describe('Test endpoint responses /api/resize?file_name=2.png&width=3-00&height=200', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/resize?file_name=2.png&width=3-00&height=200'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe(', Invalid input for width');
  });
});

// // correct format url with image dont found
describe('Test endpoint responses good format', () => {
  it('gets the api endpoint', async () => {
    const file_name = '2.png';
    const width = 200;
    const height = 600;
    const response = await request.get(
      `/api/resize?file_name=${file_name}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(400); // because   file_name = '2.png' not found
    expect(response.text).toBe(`the image named ${file_name} not found`);
  });
});

// image exist with extension
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const file_name = 'encenadaport.jpg';
    const width = 200;
    const height = 600;
    const toFile = `encenadaport_${width}_${height}.jpg`;
    const response = await request.get(
      `/api/resize?file_name=${file_name}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200); // because   file_name = '2.png' not found
    const expect_render = fs
      .readFileSync(renderFile('resize.pug'), 'utf8')
      .replaceAll('#{dir}', dirResizeImageHtml(toFile))
      .replaceAll('#{staticUrl}', staticUrl)
      .replaceAll('#{file_name}', file_name)
      .replaceAll('    ', '')
      .replaceAll(String.fromCharCode(13), '');
    expect(response.text).toBe(expect_render);
  });
});

// // image exist without extension
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const file_name = 'fjord';
    const width = 200;
    const height = 600;
    const toFile = `fjord_${width}_${height}.jpg`;
    const response = await request.get(
      `/api/resize?file_name=${file_name}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200); // because   file_name = '2.png' not found
    const expect_render = fs
      .readFileSync(renderFile('resize.pug'), 'utf8')
      .replaceAll('#{dir}', dirResizeImageHtml(toFile))
      .replaceAll('#{staticUrl}', staticUrl)
      .replaceAll('#{file_name}', file_name)
      .replaceAll('    ', '')
      .replaceAll(String.fromCharCode(13), '');
    expect(response.text).toBe(expect_render);
  });
});
