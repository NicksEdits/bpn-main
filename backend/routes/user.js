const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

//auth
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

router.get('/profile/:id',auth.requireAuth, userCtrl.getOneUser);
router.put('/profile/:id',auth.requireAuth, multer, userCtrl.modifyInfos);
router.put('/profilepic/:id', auth.requireAuth, multer, userCtrl.modifyPP);
router.delete('/profile/:id',auth.requireAuth, userCtrl.deleteUser);

module.exports = router;