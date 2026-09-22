const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: 199.99
  },
  {
    id: 2,
    name: 'USB-C Hub',
    description: '7-in-1 multiport adapter',
    price: 49.99
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard',
    price: 129.99
  }
];

function findAll() {
  return products;
}

function findById(id) {
  return products.find((product) => product.id === Number(id));
}

function findByIds(ids) {
  return ids.map((id) => findById(id)).filter(Boolean);
}

module.exports = {
  findAll,
  findById,
  findByIds
};
