# :package: Rck Image

This is a client-side package that provides a simple and easy-to-use interface for resizing and converting images between different MIME types.

## Installation

To install the package, use npm:

```bash
npm install rck-image
```

## Usage

To use the package, import it in your application:

```javascript
import RckImage from "rck-image";
```

## Resizing Images

To resize an image, use the `resize` method:

```javascript
// resizes minor dimension to 144 pixels
await RckImage("imageUrlOrFile").resize({ size: 144 }).dataURL();
```

## Converting Image MIME Types

To convert an image to a different MIME type, use the `type` property:

```javascript
// gets image in jpeg type and quality of 100%
await RckImage("imageUrlOrFile")
  .resize({ size: 144 })
  // you can use the dataURL function to get the url or you can use the file function to get the File instance
  .dataURL({ type: "image/jpeg", quality: 1 });
```

## Contributing

If you'd like to contribute to the development of this package, please fork the repository and submit a pull request.