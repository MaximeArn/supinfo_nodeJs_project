# FoodExpress API

FoodExpress is a RESTful API built with Node.js, Express, and MongoDB for managing users, restaurants, and menus.

## 🛠️ Installation

```bash
git clone <repo_url>
cd foodexpress-api
npm install
```

Create a `.env` file at the root of the project:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/food_express
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## 🌱 Seeding the database

To populate the database with initial users, restaurants, and menus:

```bash
node scripts/seed.js
```

### 👥 Test users available after seeding

- **Admin user**

  - Email: `admin@example.com`
  - Password: `password123`
  - Role: `admin`

- **Regular user**
  - Email: `john@example.com`
  - Password: `password123`
  - Role: `user`

These accounts can be used to test authenticated and role-based routes.

## 📚 Documentation

The API is documented using Swagger and available at:

```
GET http://localhost:<PORT>/api-docs
```

## 🚀 Running the project

```bash
npm run dev
```
