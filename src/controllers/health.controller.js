function healthcheck(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'E-commerce API is healthy',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  healthcheck
};
