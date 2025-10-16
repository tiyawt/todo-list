# Todo List API

REST API untuk manajemen todo list dengan autentikasi JWT, dibuat menggunakan Node.js, Express, dan MongoDB.

## Live Demo

- **API Production**: [https://todo-list-production-9b96.up.railway.app](https://todo-list-production-9b96.up.railway.app)
- **Swagger Documentation**: [https://todo-list-production-9b96.up.railway.app/docs](https://todo-list-production-9b96.up.railway.app/docs)

## Features

- Autentikasi dengan JWT (Register & Login)
- CRUD operations untuk Todo
- Pagination support
- API Documentation dengan Swagger/OpenAPI 3.0
- Protected routes dengan middleware autentikasi
- Input validation
- CORS enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Documentation**: Swagger UI + OpenAPI 3.0
- **Deployment**: Railway

## Prerequisites

- Node.js (v14 atau lebih tinggi)
- MongoDB (local atau MongoDB Atlas)
- npm atau yarn

## Installation

1. Clone repository
```bash
git clone https://github.com/username/todo-list-api.git
cd todo-list-api
```

2. Install dependencies
```bash
npm install
```

3. Buat file `.env` di root folder
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Jalankan aplikasi
```bash
# Development
npm run dev

# Production
npm start
```

5. Akses aplikasi
- API: `http://localhost:5000`
- Swagger Docs: `http://localhost:5000/docs`

## Project Structure

```
todo-list-api/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── todo.controller.js # Todo CRUD logic
│   ├── middlewares/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── Todo.js            # Todo schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── auth.routes.js     # Auth endpoints
│   │   └── todo.routes.js     # Todo endpoints
│   └── index.js               # Main app entry
├── openapi.yaml               # OpenAPI specification
├── package.json
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register user baru | ❌ |
| POST | `/api/auth/login` | Login & get JWT token | ❌ |

### Todos

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all todos (paginated) | ✅ |
| GET | `/api/todos/:id` | Get todo by ID | ✅ |
| POST | `/api/todos` | Create new todo | ✅ |
| PUT | `/api/todos/:id` | Update todo | ✅ |
| DELETE | `/api/todos/:id` | Delete todo | ✅ |
| DELETE | `/api/todos` | Delete all todos (admin) | ✅ |

## API Documentation

### Authentication

#### POST /api/auth/register
    Mendaftarkan pengguna baru.
    Request body:
```json
{
  "name": "Tiya",
  "email": "tiya@example.com",
  "password": "123456"
}
```
  Response:
```json
  {
  "message": "User registered successfully",
  "user": {
    "id": "66f8a7d8b26...",
    "email": "tiya@example.com",
    "name": "Tiya"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn Express.js",
    "description": "Build REST API with authentication",
    "dueDate": "2025-10-20T10:00:00.000Z",
    "status": "pending"
  }'
```

### Get All Todos (with pagination)
```bash
curl -X GET "http://localhost:5000/api/todos?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Authentication

API menggunakan JWT (JSON Web Token) untuk autentikasi. Setelah login, sertakan token di header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Data Models

### User
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  createdAt: Date
}
```

### Todo
```javascript
{
  id: String (auto-generated),
  title: String (required),
  description: String (optional),
  dueDate: Date,
  status: String (enum: ['pending', 'done']),
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Railway

1. Push code ke GitHub
2. Buat project baru di [Railway](https://railway.app)
3. Connect repository GitHub
4. Tambahkan environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy otomatis akan berjalan

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/todolist` |
| `JWT_SECRET` | Secret key untuk JWT | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` / `production` |

## 🧪 Testing

Gunakan Swagger UI untuk testing interaktif:
1. Buka `/docs`
2. Register user baru
3. Login untuk mendapatkan token
4. Click "Authorize" button di Swagger UI
5. Masukkan token dengan format: `Bearer YOUR_TOKEN`
6. Test semua endpoints

## Documentation

API documentation tersedia di:
- **Local**: http://localhost:5000/docs
- **Production**: https://todo-list-production-9b96.up.railway.app/docs
