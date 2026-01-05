# Recipes API - Backend

A production-ready REST API for managing recipes, built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv
- **CORS**: cors

## 📁 Project Structure

```
recipe-api-backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── recipeController.js # Business logic
├── models/
│   └── recipeModel.js      # Mongoose schema
├── routes/
│   └── recipeRoutes.js     # API routes
├── server.js               # Server entry point & Express setup
├── .env                    # Environment variables
├── .env.production.example # Production env template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Update the `.env` file with your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/recipes-app
   # For MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/recipes-app
   
   PORT=5000
   NODE_ENV=development
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **For production**
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/recipes
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recipes` | Create a new recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get recipe by ID |
| PUT | `/api/recipes/:id` | Update recipe by ID |
| DELETE | `/api/recipes/:id` | Delete recipe by ID |

### Recipe Schema

```javascript
{
  title: String (required, max 100 chars),
  ingredients: [String] (required, non-empty array),
  instructions: String (required),
  cookingTime: Number (optional, 1-1440 minutes),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 📝 API Examples

### Create Recipe
```bash
POST /api/recipes
Content-Type: application/json

{
  "title": "Chocolate Chip Cookies",
  "ingredients": [
    "2 cups flour",
    "1 cup butter",
    "1 cup sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": "Mix ingredients and bake at 350°F for 12 minutes.",
  "cookingTime": 30
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Chocolate Chip Cookies",
    "ingredients": [...],
    "instructions": "...",
    "cookingTime": 30,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Recipes
```bash
GET /api/recipes
```

**Response (200)**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Get Recipe by ID
```bash
GET /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
```

### Update Recipe
```bash
PUT /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
Content-Type: application/json

{
  "title": "Updated Recipe Title",
  "cookingTime": 45
}
```

### Delete Recipe
```bash
DELETE /api/recipes/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (200)**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {...}
}
```

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, invalid ID)
- `404` - Not Found
- `500` - Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🚢 Deployment to Render

### Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a Free Cluster** (M0 Sandbox)
3. **Create Database User**:
   - Go to "Database Access"
   - Add new user with username and password
   - Grant "Read and write to any database" privileges
4. **Whitelist IP Addresses**:
   - Go to "Network Access"
   - Add IP: `0.0.0.0/0` (Allow from anywhere)
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/recipes-app`

### Step 2: Deploy to Render

1. **Push code to GitHub** (if not already done)

2. **Create Render Account** at [render.com](https://render.com)

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `recipe-api-backend` repository

4. **Configure Service**:
   - **Name**: `recipe-api` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables**:
   
   Click "Advanced" → Add these variables:
   
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |

6. **Deploy**: Click "Create Web Service"

7. **Verify**: Check logs for "MongoDB Connected" and "Server running"

### Testing Your Deployed API

Your API will be available at: `https://recipe-api-backend-gxte.onrender.com`

Test endpoints:
- Health check: `GET https://recipe-api-backend-gxte.onrender.com/health`
- Get all recipes: `GET https://recipe-api-backend-gxte.onrender.com/api/recipes`
- Create recipe: `https://recipe-api-backend-gxte.onrender.com/api/recipes`


## 🔒 Security Best Practices

- Environment variables for sensitive data
- CORS configured for specific origins in production
- Input validation on all endpoints
- Mongoose schema validation
- Error messages don't expose sensitive information

