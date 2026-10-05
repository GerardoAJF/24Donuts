import multer from 'multer';

// Se guarda en memoria y se reenvía directo a Cloudinary (no se escribe en disco)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname);
    err.message = 'Solo se permiten imágenes';
    return cb(err);
  },
});

export const uploadProductImage = upload.single('image');
