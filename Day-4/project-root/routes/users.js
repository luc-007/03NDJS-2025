const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMe, getAllUsers, deleteUser } = require('../controllers/userController');

router.get('/me', auth, getMe);
router.get('/users', auth, getAllUsers);
router.delete('/users/:id', auth, deleteUser);

module.exports = router;