const express = require('express');
const checkoutController = require('../controllers/checkout.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/checkout', authenticate, checkoutController.checkout);

module.exports = router;
