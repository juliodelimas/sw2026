const express = require('express');
const authRoutes = require('./auth.routes');
const checkoutRoutes = require('./checkout.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

router.use(authRoutes);
router.use(checkoutRoutes);
router.use(healthRoutes);

module.exports = router;
