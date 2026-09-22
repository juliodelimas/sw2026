const productModel = require('../models/product.model');

const ALLOWED_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

function checkout({ items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('Items array is required and must not be empty');
    error.status = 400;
    throw error;
  }

  if (!paymentMethod || !ALLOWED_PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error('Payment method must be cash or credit_card');
    error.status = 400;
    throw error;
  }

  const lineItems = [];
  let subtotal = 0;

  for (const item of items) {
    if (!item.productId || !item.quantity || item.quantity < 1) {
      const error = new Error('Each item must have a valid productId and quantity >= 1');
      error.status = 400;
      throw error;
    }

    const product = productModel.findById(item.productId);
    if (!product) {
      const error = new Error(`Product with id ${item.productId} not found`);
      error.status = 404;
      throw error;
    }

    const lineTotal = Number((product.price * item.quantity).toFixed(2));
    subtotal += lineTotal;

    lineItems.push({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal
    });
  }

  subtotal = Number(subtotal.toFixed(2));
  const discount = paymentMethod === 'cash'
    ? Number((subtotal * CASH_DISCOUNT_RATE).toFixed(2))
    : 0;
  const total = Number((subtotal - discount).toFixed(2));

  return {
    items: lineItems,
    paymentMethod,
    subtotal,
    discount,
    discountRate: paymentMethod === 'cash' ? CASH_DISCOUNT_RATE : 0,
    total
  };
}

module.exports = {
  checkout,
  ALLOWED_PAYMENT_METHODS,
  CASH_DISCOUNT_RATE
};
