# 🗄️ Database Setup Guide - Railway

## **Step 1: Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Click "Login" and sign up with GitHub
3. Verify your account

## **Step 2: Create PostgreSQL Database**
1. Click "New Project" 
2. Select "Provision PostgreSQL"
3. Wait for database creation (takes 1-2 minutes)

## **Step 3: Get Database URL**
1. Click on your PostgreSQL service
2. Go to "Variables" tab
3. Look for `DATABASE_URL` - this is your connection string
4. Copy the entire value (looks like: `postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway`)

## **Step 4: Add to Vercel**
1. In Vercel Environment Variables
2. Name: `DATABASE_URL`
3. Value: Paste the Railway DATABASE_URL
4. Environment: Select "Production, Preview, and Development"
5. Click "Save"

---

# 🗄️ Alternative: Supabase Setup

## **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → Sign up with GitHub

## **Step 2: Create Database**
1. Click "New Project"
2. Choose organization
3. Enter project name: `karamsathi-db`
4. Enter database password (save this!)
5. Select region (choose closest to your users)
6. Click "Create new project"

## **Step 3: Get Database URL**
1. Go to Project Settings (gear icon)
2. Click "Database" in sidebar
3. Find "Connection string" section
4. Select "URI" tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual password

Example:
```
postgresql://postgres.xxx:YOUR-PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres
```

---

# 🗄️ Alternative: PlanetScale Setup

## **Step 1: Create PlanetScale Account**
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up with GitHub
3. Complete onboarding

## **Step 2: Create Database**
1. Click "Create database"
2. Name: `karamsathi`
3. Select region
4. Click "Create database"

## **Step 3: Get Connection String**
1. Go to your database dashboard
2. Click "Connect"
3. Select "Prisma" from framework dropdown
4. Copy the DATABASE_URL
5. Note: You'll need to copy both the URL and create a `.env` with the password

---

## **⚠️ Important Notes:**

### **For Railway:**
- ✅ Easiest setup
- ✅ Free tier available
- ✅ Automatic backups
- ✅ No additional configuration needed

### **For Supabase:**
- ✅ Generous free tier
- ✅ Built-in dashboard
- ⚠️ Replace `[YOUR-PASSWORD]` with actual password
- ⚠️ Use pooled connection for production

### **For PlanetScale:**
- ✅ Serverless MySQL
- ✅ Branch-based workflow
- ⚠️ More complex setup
- ⚠️ Requires specific Prisma configuration

## **🎯 Recommended Choice:**
**Use Railway** for the simplest setup - it provides a ready-to-use PostgreSQL URL without additional configuration.
