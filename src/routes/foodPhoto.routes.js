const router = require('express').Router();
const ctrl = require('../controllers/foodPhoto.controller');
const authenticate = require('../middleware/auth.middleware');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'trainer_platform/food_photos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', authenticate, upload.single('photo'), ctrl.uploadPhoto);
router.get('/client/:clientId', authenticate, ctrl.getClientPhotos);
router.delete('/:id', authenticate, ctrl.deletePhoto);

module.exports = router;
