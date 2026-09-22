const request = require('supertest');
const { expect } = require('chai');

const API_URL = 'http://localhost:3000';

describe('Path Coverage', function () {
  it('GET /healthcheck', async function () {
    const res = await request(API_URL).get('/healthcheck');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'ok');
  });

  it('POST /register', async function () {
    const uniqueEmail = `path-coverage-${Date.now()}@example.com`;

    const res = await request(API_URL)
      .post('/register')
      .send({
        name: 'John Doe',
        email: uniqueEmail,
        password: 'password123',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('user');
    expect(res.body.user).to.include({
      name: 'John Doe',
      email: uniqueEmail,
    });
  });

  it('POST /login', async function () {
    const res = await request(API_URL)
      .post('/login')
      .send({
        email: 'alice@example.com',
        password: 'password123',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token').that.is.a('string');
    expect(res.body).to.have.property('user');
    expect(res.body.user).to.include({
      email: 'alice@example.com',
    });
  });

  it('POST /checkout', async function () {
    const loginRes = await request(API_URL)
      .post('/login')
      .send({
        email: 'alice@example.com',
        password: 'password123',
      });

    expect(loginRes.status).to.equal(200);
    const token = loginRes.body.token;

    const res = await request(API_URL)
      .post('/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentMethod: 'cash',
        items: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('paymentMethod', 'cash');
    expect(res.body).to.have.property('total').that.is.a('number');
  });
});
