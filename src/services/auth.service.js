const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'sw2026-ecommerce-secret';
const JWT_EXPIRES_IN = '1h';

function register({ name, email, password }) {
  if (!name || !email || !password) {
    const error = new Error('Name, email and password are required');
    error.status = 400;
    throw error;
  }

  if (userModel.findByEmail(email)) {
    const error = new Error('Email already registered');
    error.status = 409;
    throw error;
  }

  const user = userModel.create({ name, email, password });
  return user;
}

function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  const user = userModel.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
  JWT_SECRET
};
