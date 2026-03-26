const router = require('express').Router();
const ctrl = require('../controllers/foodPhoto.controller');
const authenticate = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `food_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

router.post('/upload', authenticate, upload.single('photo'), ctrl.uploadPhoto);
router.get('/client/:clientId', authenticate, ctrl.getClientPhotos);
router.delete('/:id', authenticate, ctrl.deletePhoto);

module.exports = router;
