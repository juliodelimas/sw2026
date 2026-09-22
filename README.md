# E-commerce REST API

## Description

In-memory e-commerce REST API built with JavaScript and Express. Consumers can register, login to receive a JWT token, and perform checkout. Data is stored in memory only (no database).

## Installation

```bash
npm install
```

## How to Run

```bash
npm start
```

The API will be available at `http://localhost:3000`.

Swagger UI is available at `http://localhost:3000/api-docs`.

For development with auto-restart:

```bash
npm run dev
```

## Rules

1. **Authentication required for checkout** — only authenticated users (valid JWT) can call `/checkout`.
2. **Payment methods** — checkout accepts only `cash` or `credit_card`.
3. **Cash discount** — paying with `cash` applies a **10% discount** on the order subtotal.
4. **In-memory storage** — users and products live in memory; data resets when the server restarts.
5. **No database** — no external persistence layer is used.

## Existent Data

### Users

| ID | Name            | Email              | Password     |
|----|-----------------|--------------------|--------------|
| 1  | Alice Johnson   | alice@example.com  | password123  |
| 2  | Bob Smith       | bob@example.com    | password123  |
| 3  | Carol Williams  | carol@example.com  | password123  |

### Products

| ID | Name                  | Description                          | Price  |
|----|-----------------------|--------------------------------------|--------|
| 1  | Wireless Headphones   | Noise-cancelling over-ear headphones | 199.99 |
| 2  | USB-C Hub             | 7-in-1 multiport adapter             | 49.99  |
| 3  | Mechanical Keyboard   | RGB backlit mechanical keyboard      | 129.99 |

## How to Use the Rest API

### 1. Healthcheck

```bash
curl http://localhost:3000/healthcheck
```

### 2. Register

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

Response includes a `token` field. Use it as a Bearer token for checkout.

### 4. Checkout (authenticated)

```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d '{
    "paymentMethod": "cash",
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 3, "quantity": 1 }
    ]
  }'
```

- Use `"paymentMethod": "cash"` for a 10% discount.
- Use `"paymentMethod": "credit_card"` for full price (no discount).

### Project Structure

```
src/
  controllers/   # Request handlers
  middleware/    # JWT authentication middleware
  models/        # In-memory users and products
  routes/        # Route definitions
  services/      # Business logic
  app.js         # Express app setup
server.js        # Server entry point
swagger.yaml     # OpenAPI specification
```
