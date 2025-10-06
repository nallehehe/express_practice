const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  registerAdmin,
} = require('../services/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/registeradmin', registerAdmin);

module.exports = router;
