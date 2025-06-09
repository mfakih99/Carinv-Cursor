# Railway Deployment Guide

## 🚀 Your app is Railway-ready!

This Car Wholesaler Inventory Management System is configured and ready to deploy on Railway. Follow these steps:

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Railway CLI installed (optional but recommended)
   ```bash
   npm install -g @railway/cli
   ```

## Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Connect to Railway**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository: `mfakih99/Carinv-Cursor`
   - Railway will automatically detect the configuration

2. **Configure PostgreSQL**
   - In your Railway project, click "New Service"
   - Select "Database" → "Add PostgreSQL"
   - Railway will automatically create a PostgreSQL instance

3. **Connect Database to App**
   - Click on your app service
   - Go to "Variables" tab
   - Railway should automatically inject the `DATABASE_URL` from PostgreSQL
   - If not, copy the `DATABASE_URL` from PostgreSQL service and add it manually

4. **Add Additional Environment Variables**
   ```
   NEXTAUTH_SECRET=generate-a-secure-random-string
   NEXTAUTH_URL=https://your-app-name.up.railway.app
   VIN_DECODER_API_URL=https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin
   ```

5. **Deploy**
   - Railway will automatically deploy when you push to GitHub
   - First deployment will:
     - Install dependencies
     - Generate Prisma client
     - Run database migrations
     - Build the Next.js app
     - Start the server

### Method 2: Deploy using Railway CLI

1. **Login to Railway**
   ```bash
   railway login
   ```

2. **Create new project**
   ```bash
   railway new
   ```

3. **Add PostgreSQL**
   ```bash
   railway add postgresql
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Open your app**
   ```bash
   railway open
   ```

## Post-Deployment Setup

1. **Initialize Database**
   - Once deployed, you need to run migrations:
   ```bash
   railway run npx prisma db push
   ```

2. **Create Admin User**
   - You'll need to implement user authentication first
   - Or manually create a user in the database

3. **Configure Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain

## Environment Variables Checklist

✅ Required:
- `DATABASE_URL` - Automatically provided by Railway PostgreSQL
- `NEXTAUTH_SECRET` - Generate using: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your Railway app URL

✅ Optional:
- `VIN_DECODER_API_URL` - Already set to free NHTSA API
- AWS S3 credentials (when you implement file uploads)

## Monitoring & Logs

- View logs: Railway Dashboard → Your Service → Logs
- Monitor metrics: Railway Dashboard → Your Service → Metrics
- Set up alerts: Railway Dashboard → Your Service → Settings → Notifications

## Troubleshooting

### Build Fails
- Check logs for specific errors
- Ensure all dependencies are in package.json
- Verify Prisma schema is valid

### Database Connection Issues
- Verify DATABASE_URL is set correctly
- Check if PostgreSQL service is running
- Ensure Prisma client is generated

### Application Crashes
- Check for missing environment variables
- Review application logs
- Verify Node.js version compatibility

## What's Configured

✅ **package.json**: Added `postinstall` script for Prisma
✅ **railway.json**: Deployment configuration
✅ **nixpacks.toml**: Build configuration with Node.js 20
✅ **Prisma**: Ready for PostgreSQL connection
✅ **Next.js**: Production-ready build settings

## Next Steps After Deployment

1. Set up user authentication
2. Configure file uploads (AWS S3)
3. Add monitoring (Sentry, LogRocket)
4. Set up automated backups
5. Configure CI/CD pipeline

Your app is ready to deploy! 🎉 