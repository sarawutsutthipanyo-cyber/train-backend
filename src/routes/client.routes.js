const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/client.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);
router.get('/me', ctrl.getMyProfile);
router.get('/my-profile', ctrl.getMyProfile);
router.get('/', ctrl.getMyClients);
router.get('/:id', ctrl.getClientById);
router.post('/', ctrl.createClient);
router.put('/:id', ctrl.updateClient);
router.get('/:clientId/stats', ctrl.getClientStats);

module.exports = router;
