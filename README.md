# 📃 MongoDB Setup Guide for FoodExpress (Josue-remy & Maxime)

This project uses MongoDB as the database. To make it easier for the corrector to run the API locally, please follow these instructions to start a MongoDB container using Docker.

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

## 🔐 Connection String Used in the Project

```env
MONGO_URI=mongodb://food_express_username:food_express_password@localhost:27017/food_express?authSource=admin
```

## ⚡️ Stopping the Container

```bash
docker stop mongo-foodexpress
```

```bash
docker rm -f mongo-foodexpress
```
