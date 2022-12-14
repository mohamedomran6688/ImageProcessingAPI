# ImageProcessingAPI

- Install: `npm install`
- Build: `npm run build`
- Lint: `npm run lint`
- Prettify: `npm run prettier`
- Run unit tests: `npm run test`
- Start server: `npm run start`

### Usage

The server will listen on port 3000 : you can edit it from src/imageProcessing/settings.ts

#### Endpoint to resize images

http://localhost:3000/api/resize

Expected query arguments are:

- _file_name_: Available file_names are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1

http://localhost:3000/api/resize?file_name=fjord&width=200&height=200
Will scale the fjord image to 200 by 200 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.

#### Example 4

http://localhost:3000/api/resize?file_name=fjord&width=-200&height=200
Invalid url format that will be hinted to.

#### Example 5

http://localhost:3000/api/resize?file_name=fjord&width=200
Invalid url format that will be hinted to.

### Notes

- Image thumbs will be stored in `src/static/imgs/imagesResize` and can change directory src/imageProcessing/settings.ts

- you change {port, staticUrl ,dirStatic ,dirTemplate ,dirImages ,dirResizeImages} from src/imageProcessing/settings.ts
