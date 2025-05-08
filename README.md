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
PORT="9283"
MONGODB_URI="mongodb://food_express_username:food_express_password@localhost:27017/food_express?authSource=admin"
MONGODB_URI_TEST="mongodb://localhost:27017/foodexpress_test"
JWT_SECRET="tz38yecvFGzjzidvzej_6767eujzyh72728zjdviez"
JWT_EXPIRES_IN="1h"
```

## 🚀 Launch the MongoDB Container

```bash
docker run -d \
  --name mongo-foodexpress \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=food_express_username \
  -e MONGO_INITDB_ROOT_PASSWORD=food_express_password \
  -e MONGO_INITDB_DATABASE=food_express \
  mongo
```

## ⚡️ Stopping the Container

```bash
docker stop mongo-foodexpress
```

```bash
docker rm -f mongo-foodexpress
```

## 🌱 Seeding the database

To populate the database with initial users, restaurants, and menus:

```bash
npm run seed
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
