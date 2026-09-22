const checkoutService = require('../services/checkout.service');

function checkout(req, res, next) {
  try {
    const result = checkoutService.checkout(req.body);
    res.status(200).json({
      message: 'Checkout completed successfully',
      userId: req.user.id,
      ...result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkout
};
