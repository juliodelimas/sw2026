const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: bcrypt.hashSync('password123', 8)
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: bcrypt.hashSync('password123', 8)
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    password: bcrypt.hashSync('password123', 8)
  }
];

let nextId = 4;

function findAll() {
  return users.map(({ password, ...user }) => user);
}

function findByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findById(id) {
  return users.find((user) => user.id === id);
}

function create({ name, email, password }) {
  const user = {
    id: nextId++,
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 8)
  };
  users.push(user);
  const { password: _, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  findAll,
  findByEmail,
  findById,
  create
};
