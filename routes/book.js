const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const { createReview } = require('../services/book');

router.post('/createreview', verifyToken, createReview);

module.exports = router;
