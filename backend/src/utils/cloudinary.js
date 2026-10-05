import { v2 as cloudinary } from 'cloudinary';
import config from '../../config.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

// Sube un archivo en memoria (buffer de multer) y devuelve la URL https pública
export const uploadImage = (buffer, folder = '24donuts/products') =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        return resolve(result.secure_url);
      })
      .end(buffer);
  });

export default cloudinary;
