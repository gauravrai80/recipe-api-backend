# Recipe API - Deployment Guide for Render

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account (free tier available)
- ✅ Render account (free tier available)

## 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Verify your email

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `recipes-app` (or your preferred name)
   
   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/recipes-app?retryWrites=true&w=majority
   ```

## 📤 Step 2: Push to GitHub

1. **Initialize Git (if not already done)**
   ```bash
   cd "c:\Users\hp\OneDrive\Desktop\full-stack_recipie - Copy"
   git init
   git add .
   git commit -m "Backend-only Recipe CRUD API"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it (e.g., `recipe-api-backend`)
   - Make it public
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/recipe-api-backend.git
   git branch -M main
   git push -u origin main
   ```

## 🚀 Step 3: Deploy to Render

1. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub (recommended)

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the repository you just created

3. **Configure Build Settings**
   
   **Basic Settings:**
   - **Name**: `recipe-api` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   
   **Build & Deploy:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Render will build and start your application

## ✅ Step 4: Verify Deployment

1. **Check Deployment Status**
   - Watch the logs in Render dashboard
   - Look for "MongoDB Connected" message
   - Look for "Server running" message

2. **Get Your API URL**
   - Copy the URL from Render dashboard
   - Format: `https://recipe-api-xxxx.onrender.com`

3. **Test Endpoints**
   
   **Health Check:**
   ```
   GET https://your-app-name.onrender.com/health
   ```
   
   **Create Recipe:**
   ```
   POST https://your-app-name.onrender.com/api/recipes
   Content-Type: application/json
   
   {
     "title": "Test Recipe",
     "ingredients": ["ingredient 1", "ingredient 2"],
     "instructions": "Test instructions",
     "cookingTime": 30
   }
   ```
   
   **Get All Recipes:**
   ```
   GET https://your-app-name.onrender.com/api/recipes
   ```

## 📝 Step 5: Update Postman Collection

1. **Import Collection**
   - Open Postman
   - Import `POSTMAN_COLLECTION.json`

2. **Create Environment**
   - Click "Environments" in Postman
   - Create new environment "Production"
   - Add variable:
     - `base_url`: `https://your-app-name.onrender.com`

3. **Test All Endpoints**
   - Select "Production" environment
   - Test each endpoint in the collection

## 🎯 Submission Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with credentials
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Code pushed to GitHub repository
- [ ] Render web service created
- [ ] Environment variables configured in Render
- [ ] Application deployed successfully
- [ ] Health check endpoint working
- [ ] All CRUD endpoints tested
- [ ] Postman collection updated with production URL

## 📋 URLs to Submit

After deployment, submit these URLs:

1. **GitHub Repository URL**
   ```
   https://github.com/YOUR_USERNAME/recipe-api-backend
   ```

2. **Deployed API URL (Render)**
   ```
   https://your-app-name.onrender.com
   ```

3. **API Documentation**
   - Link to your GitHub README
   - Postman collection (in repository)

## ⚠️ Important Notes

- **Free Tier Limitations**:
  - Render free tier spins down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - This is normal for free tier

- **Environment Variables**:
  - Never commit `.env` file to GitHub
  - Always use Render's environment variable settings

- **MongoDB Atlas**:
  - Free tier has 512MB storage limit
  - Sufficient for development and testing

## 🐛 Troubleshooting

**Issue: Deployment fails**
- Check build logs in Render
- Verify `package.json` has correct dependencies
- Ensure `npm start` script exists

**Issue: MongoDB connection error**
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist
- Verify database user credentials

**Issue: 404 on all endpoints**
- Check Root Directory is set to `backend`
- Verify routes are correctly mounted in `app.js`

**Issue: Server not starting**
- Check environment variables in Render
- Review server logs for errors
- Ensure PORT is set to 5000

## 🎉 Success!

Once deployed, your API will be accessible at:
```
https://your-app-name.onrender.com/api/recipes
```

You can now submit your GitHub and Render URLs to the portal!
